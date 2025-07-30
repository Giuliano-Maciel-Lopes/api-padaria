import { prisma } from "@/database/prisma.js";
import { AppError } from "@/utils/app-error.js";
import { Product, OrderItem } from "@prisma/client";

type OrderItemInput = {
  productId: string;
  quantity: number;
};
export async function creatUpsertOrderItems(orderId: string, items: OrderItemInput[]) {
  const productIds = items.map((item) => item.productId);

  const products = await prisma.product.findMany({
    where: { id: { in: productIds } },
  });

  if (products.length !== productIds.length) {
    throw new AppError("Um ou mais produtos não foram encontrados.", 404);
  }

  for (const item of items) {
    const product = products.find((p) => p.id === item.productId);
    if (!product) continue;

    const existing = await prisma.orderItem.findFirst({
      where: { orderId, productId: item.productId },
    });

    if (existing) {
      await prisma.orderItem.update({
        where: { id: existing.id },
        data: {
          quantity: existing.quantity + item.quantity,
        },
      });
    } else {
      await prisma.orderItem.create({
        data: {
          orderId,
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: product.price,
        },
      });
    }
  }

  // 👇 Atualiza o valor total do pedido
  const orderItems = await prisma.orderItem.findMany({
    where: { orderId },
    include: { product: true },
  });

  const totalAmount = orderItems.reduce((sum, item) => {
    return sum + item.quantity * item.unitPrice;
  }, 0);

  await prisma.order.update({
    where: { id: orderId },
    data: { totalAmount },
  });
}


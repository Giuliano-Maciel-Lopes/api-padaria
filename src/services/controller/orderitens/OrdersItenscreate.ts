import { prisma } from "@/database/prisma.js";
import { AppError } from "@/utils/app-error.js";
import { validateProducts } from "./validateProducts.js";
import { upsertOrderItem } from "./upsertOrderItem.js";
import { updateTotalAmount } from "./UpdatadeTotal.js";

type OrderItemInput = {
  productId: string;
  quantity: number;
};

export async function creatUpsertOrderItems(orderId: string, items: OrderItemInput[]) {
  const productIds = items.map((item) => item.productId); //peguei tds ids do product 

  // Valida se todos os produtos existem
  const products = await validateProducts(productIds);

  for (const item of items) {
    const product = products.find((p) => p.id === item.productId); 

    if (!product) continue; // o que nao dev ecocorrer pois validei preucaçao

    const existing = await prisma.orderItem.findFirst({
      where: { orderId, productId: item.productId },
    });

    await upsertOrderItem(
      orderId,
      existing ? existing.quantity + item.quantity : item.quantity,
      item.productId,
      product.price,
      existing?.id
    );
  }

  // Atualiza o valor total do pedido
  await updateTotalAmount(orderId);
}

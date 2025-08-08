import { prisma } from "@/database/prisma.js";
import { OrderWithItems } from "../stripe/verifyordersStatus.js";

export async function updateProductStatusOrders(order: OrderWithItems) {
  // order já tem os items e produtos, não precisa buscar de novo

  for (const item of order.items) {
      const newStock = item.product.stock - item.quantity;
    await prisma.product.update({
      
      where: {
        id: item.product.id,
      },
      data: {
        stock: {
          decrement: item.quantity, 
        },
          isActive: newStock <= 0 ? false : item.product.isActive,
      },
    });
  }

 
  await prisma.order.update({
    where: { id: order.id },
    data: { status:"ITENS_PROCESSING" },
  });
}

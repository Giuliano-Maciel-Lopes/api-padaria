import { prisma } from "@/database/prisma.js";

export async function updateTotalAmount(orderId: string) {
  const itemsOrders = await prisma.orderItem.findMany({ where: { orderId } });

 const totalAmount = itemsOrders.reduce((acc, item) => {
    return acc + item.quantity * item.unitPrice;
  }, 0);

        await prisma.order.update({where:{id:orderId},data:{totalAmount}})
}

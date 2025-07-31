import { prisma } from "@/database/prisma.js";



export async function upsertOrderItem(
  orderId: string,
  quantity:number,
  productId:string,
  productPrice: number,
  existingItemId?: string,

) {
    
  if (existingItemId) {
    await prisma.orderItem.update({
      where: { id: existingItemId },
      data: {
        quantity,
      },
    });
  } else {
    await prisma.orderItem.create({
      data: {
        orderId,
        productId,
        quantity,
        unitPrice: productPrice,
      },
    });
  }
}

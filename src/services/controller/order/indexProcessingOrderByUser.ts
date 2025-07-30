import { prisma } from "@/database/prisma.js"


export async function getProcessingOrderByUser(userId: string) {
  return prisma.order.findFirst({
    where: {
      userId,
      status: "PROCESSING",
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  })
}

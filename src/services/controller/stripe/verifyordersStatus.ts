import { prisma } from "@/database/prisma.js";
import type { Order, OrderItem, Product } from "@prisma/client";

export type OrderWithItems = Order & {
  items: (OrderItem & { product: Product })[];
};

export async function veryfyOrdersStatus(userId: string): Promise<OrderWithItems | null> {
  return await prisma.order.findFirst({
    where: { userId, status: "PROCESSING" },
    include: {
      items: {
        include: { product: true },
      },
    },
  });
}

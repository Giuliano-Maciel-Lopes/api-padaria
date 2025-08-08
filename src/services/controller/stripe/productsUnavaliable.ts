import { prisma } from "@/database/prisma.js";
import { Order, OrderItem, Product } from "@prisma/client";

type OrderWithItems = Order & {
  items: (OrderItem & { product: Product })[];
};

export async function ProductsUnuvaliable(order: OrderWithItems) {
 

  const unavailable = order.items.filter(
    (item) => item.product.stock < item.quantity || !item.product.isActive
  );

  return unavailable.map((item) => ({
    name: item.product.name,
    stock: item.product.stock,
    active: item.product.isActive,
  }));
}

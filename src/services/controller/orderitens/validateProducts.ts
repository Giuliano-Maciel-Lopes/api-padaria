import { prisma } from "@/database/prisma.js";
import { AppError } from "@/utils/app-error.js";

prisma;
export async function validateProducts(productIds: string[]) {
  const products = await prisma.product.findMany({
    where: { id: { in: productIds } },
  });

  if (products.length !== productIds.length) {
    throw new AppError("Um ou mais produtos não foram encontrados.", 404);
  }

  return products;
}

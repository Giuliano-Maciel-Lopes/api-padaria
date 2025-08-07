import { prisma } from "@/database/prisma.js";
import { Response } from "express";


export async function searchProduct404(id: string, res: Response) {
  const product = await prisma.product.findUnique({ where: { id } });

  if (!product) {
    res.status(404).json({ message: "Opss, produto não encontrado!" });
    return null;
  }

  return product;
}

import { Request, Response } from "express";
import z from "zod";

import { prisma } from "@/database/prisma.js";

class ProductDaysController {
  async create(req: Request, res: Response): Promise<any> {
    const productDaySchema = z.object({
      productName: z.string().min(1), // colocar to lower case
      dayName: z.string().min(1),
      stock: z.number().int().min(0),
    });
    const { productName, dayName, stock } = productDaySchema.parse(req.body);

    const product = await prisma.product.findFirst({
      where: { name: productName },
    });

    if (!product) {
      return res.status(404).json("product nao encontardo");
    }
    const day = await prisma.dayOfWeek.findFirst({ where: { name: dayName } });

    if (!day) {
      return res.status(404).json("data informada errada");
    }

    await prisma.productDay.create({
      data: { productId: product.id, dayOfWeekId: day.id, stock },
    });

    res.json("ok");
  }
  async index(req: Request, res: Response) {
    const querySchema = z.object({
      nameday: z
        .string()
        .transform((val) => val.toLowerCase())
        .optional(),
    });
    const { nameday } = querySchema.parse(req.query);

    const productDay = await prisma.productDay.findMany({
      where: { dayOfWeek: { is: { name: nameday } } },
      select: { //n pode usar select e join junto am select faz ,eio que o papel de join 
        stock: true,
        product: { select: { name: true, price: true, category: true } },
        dayOfWeek: { select: { name: true } },
      },
    });
    res.status(200).json(productDay);
  }
}

export { ProductDaysController };

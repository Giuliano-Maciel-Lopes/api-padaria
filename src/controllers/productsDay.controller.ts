import { Request, Response } from "express";
import z from "zod";
import { prisma } from "@/database/prisma.js";
import { createProductDaySchema } from "@/schema/productsDay/create.js";
import { queryProductDaySchema } from "@/schema/productsDay/index.js";


class ProductDaysController {
    async create(req: Request, res: Response): Promise<void> {

    const { productName, dayName, stock } = createProductDaySchema.parse(req.body);

    const product = await prisma.product.findFirst({
      where: { name: productName },
    });
     const day = await prisma.dayOfWeek.findFirst({ where: { name: dayName } });

    if (!product || !day ) {
      res.status(404).json("product ou dia nao encontrado");
       return // coloquei id aqui inves de ali em cima 
    }

    await prisma.productDay.create({
      data: { productId: product.id, dayOfWeekId: day.id, stock },
    });

    res.json("ok");
  }
  async index(req: Request, res: Response) {
    
    const { name } = queryProductDaySchema.parse(req.query);

    const productDay = await prisma.productDay.findMany({
      where: { dayOfWeek: { is: { name} } },
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

import { prisma } from "@/database/prisma.js";
import z from "zod";
import { Request, Response } from "express";
import { createProductSchema } from "@/schema/products/creat.js";
import { indexProductQuerySchema } from "@/schema/products/index.js";
import { idParamSchema } from "@/schema/products/remove.js";
import { updateProductBodySchema } from "@/schema/products/update.js";
import { verifyStockUpdate } from "@/services/controller/products/verifyStockUpdate.js";
import { Prisma } from "@prisma/client";
import { searchProduct404 } from "@/services/controller/products/searchProduct404.js";
import { bodySchemaUpdateACtive } from "@/schema/products/updateIsActive.js";


class ProductsController {
  async create(req: Request, res: Response) {
    const data = createProductSchema.parse(req.body);

    await prisma.product.create({
      data: data,
    });

    res.status(201).json({ message: "Produto cadastrado com sucesso." });
  }

  async index(req: Request, res: Response) {
    const role = req.user?.role;
    const { category, isVitrine, search } = indexProductQuerySchema.parse(
      req.query
    );

    const wherebase = {
      category,
      isVitrine,
      name: search
        ? { contains: search, mode: Prisma.QueryMode.insensitive }
        : undefined,
    };

    const whereRole =
      role === "ADMIN" || role == "STOCK" ? {} : { isActive: true };

    const products = await prisma.product.findMany({
      where: {
        ...wherebase,
        ...whereRole,
      },
      orderBy: { price: "asc" },
    });

    res.status(200).json(products);
  }

  async remove(req: Request, res: Response) {
    const { id } = idParamSchema.parse(req.params);

    const product = await searchProduct404(id, res); 
    if (!product) return;

    const isInOrders = await prisma.orderItem.findFirst({
  where: { productId: id },
});

if (isInOrders) {
   res.status(400).json("Não é possível deletar: produto vinculado a pedidos.");
  return
}

    await prisma.product.delete({ where: { id } });
    res.status(200).json("item removido");
  }
   async updateActive(req: Request, res: Response):Promise <void> {
    const { id } = idParamSchema.parse(req.params);
    const {isActive} = bodySchemaUpdateACtive.parse(req.body)


    const product = await searchProduct404(id, res); 
    if (!product) return;
    
     if (isActive === true && product.stock === 0) {
    res.status(400).json({
      message: "Não é possível ativar um produto com estoque zerado.",
    });
     return
  }

   const productView =  await prisma.product.update({ where: { id }, data:{isActive} });
    res.status(200).json(productView);
  }

  async update(req: Request, res: Response) {
    const { id } = idParamSchema.parse(req.params);

    const data = updateProductBodySchema.parse(req.body);

      const productverify = await searchProduct404(id, res); 
    if (!productverify) return;

    const finalData = verifyStockUpdate(data);

    const product = await prisma.product.update({
      where: { id },
      data: finalData,
    });
    res.status(201).json(product);
  }

  async showById(req: Request, res: Response) {
    const role = req.user?.role;
    const whereRole =
      role === "ADMIN" || role == "STOCK" ? {} : { isActive: true };
    const { id } = idParamSchema.parse(req.params);

    const product = await prisma.product.findUnique({
      where: { id, ...whereRole },
    });
    res.json(product);
  }
}
export { ProductsController };
// vc do passado deixou uma mensagem para vc ms no update caso esqueça

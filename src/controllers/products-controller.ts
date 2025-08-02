import { prisma } from "@/database/prisma.js";
import z from "zod";
import { Request, Response } from "express";
import { createProductSchema } from "@/schema/products/creat.js";
import { indexProductQuerySchema } from "@/schema/products/index.js";
import { idParamSchema } from "@/schema/products/remove.js";
import { updateProductBodySchema } from "@/schema/products/update.js";

class ProductsController {
  async create(req: Request, res: Response) {
    const data = createProductSchema.parse(req.body);

    await prisma.product.create({
      data: data,
    });

    res.status(201).json({ message: "Produto cadastrado com sucesso." });
  }
  async index(req: Request, res: Response) {
    const { category, isVitrine, search } = indexProductQuerySchema.parse(
      req.query
    );
    const products = await prisma.product.findMany({
      where: {
        category,
        isVitrine,
        name: search ? { contains: search, mode: "insensitive" } : undefined,
      },
      orderBy: { price: "asc" },
    });
    res.status(200).json(products);
  }
  async remove(req: Request, res: Response) {
    const { id } = idParamSchema.parse(req.params);

    const confirm_id = await prisma.product.findUnique({ where: { id } }); //preucaçao mas so o uuid no zod ja reoslve

    if (!confirm_id) {
      res.status(404).json("opss produto nao encontrado!");
    }

    await prisma.product.delete({ where: { id } });
    res.status(200).json("item removido");
  }
  async update(req: Request, res: Response) {
    // Giuliano: antes de ir dormir; conferir sobre a questao de input vazio e perder os dados do bd amanha

    const { id } = idParamSchema.parse(req.params);

    const data = updateProductBodySchema.parse(req.body);

    const confirm_id = await prisma.product.findUnique({ where: { id } });

    if (!confirm_id) {
      res.status(404).json("opss produto nao encontrado!");
    }

    const product = await prisma.product.update({
      where: { id },
      data: data,
    });
    res.status(201).json(product);
  }
  async show(req: Request, res: Response) {
    const bodySchema = z.object({
      name: z.string(),
    });

    const { name } = bodySchema.parse(req.body);
    const products = await prisma.product.findMany({
      where: { name: { contains: name, mode: "insensitive" } },
    });
    res.status(200).json(products);
  }
  async showById(req: Request, res: Response) {
    const { id } = idParamSchema.parse(req.params);

    const product = await prisma.product.findUnique({ where: { id } });
    res.json(product);
  }
}
export { ProductsController };
// vc do passado deixou uma mensagem para vc ms no update caso esqueça

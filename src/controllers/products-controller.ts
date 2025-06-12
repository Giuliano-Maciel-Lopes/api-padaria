import { prisma } from "@/database/prisma.js";
import z from "zod";
import { Request , Response } from "express";

class ProductsController {

  async create(req: Request, res: Response) {

     const bodySchema = z.object({
      name: z.string().trim().min(3, { message: "O nome deve ter no mínimo 3 caracteres." }),
      description: z.string().optional(),
      category: z.string().trim().min(1, { message: "Adicione uma categoria válida." }),
      price: z.number({ invalid_type_error: "O preço deve ser um número." }).positive({ message: "O preço deve ser positivo." }),
    });

    const { name, description, category, price } = bodySchema.parse(req.body);

    await prisma.product.create({
      data: { name, description, category, price },
    });

   res.status(201).json({ message: "Produto cadastrado com sucesso." });
  }
  
}
export {ProductsController}
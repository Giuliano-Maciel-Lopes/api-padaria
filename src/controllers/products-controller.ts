import { prisma } from "@/database/prisma.js";
import z from "zod";
import { Request, Response } from "express";


class ProductsController {
  async create(req: Request, res: Response) {
    const bodySchema = z.object({
      name: z
        .string()
        .trim()
        .min(3, { message: "O nome deve ter no mínimo 3 caracteres." }),
      description: z.string().optional(),
      category: z
        .string()
        .trim()
        .min(1, { message: "Adicione uma categoria válida." })
        .transform((val) => val.toLowerCase()),

      price: z
        .number({ message: "O preço deve ser um número." })
        .positive({ message: "O preço deve ser positivo." }),
    });

    const { name, description, category, price } = bodySchema.parse(req.body);

    await prisma.product.create({
      data: { name, description, category, price },
    });

    res.status(201).json({ message: "Produto cadastrado com sucesso." });
  }
  async index(req: Request, res: Response) {
    const querySchema = z.object({
      category: z.string().transform((val) => val.toLowerCase()),
    });
    const { category } = querySchema.parse(req.query);
    const products = await prisma.product.findMany({
      where: { category: category },
      orderBy: { price: "asc" },
    });
    res.status(200).json(products);
  }
  async remove(req: Request, res: Response) {
    const id = z
      .string()
      .uuid({ message: "ID inválido, deve ser um UUID" })
      .parse(req.params.id);
      
      const confirm_id = await prisma.product.findUnique({where: {id}}) //preucaçao mas so o uuid no zod ja reoslve

   if(!confirm_id){
     res.status(404).json("opss produto nao encontrado!")
   }


    await prisma.product.delete({ where: { id } });
    res.status(200).json("item removido");
  }
  async update(req: Request, res: Response) {
    // Giuliano: antes de ir dormir; conferir sobre a questao de input vazio e perder os dados do bd amanha 
    
    const id = z
      .string()
      .uuid({ message: "ID inválido, deve ser um UUID" })
      .parse(req.params.id);

    const updateSchema = z.object({
      name: z
        .string()
        .trim()
        .min(3, { message: "O nome deve ter no mínimo 3 caracteres." }),
        

      description: z.string().optional(),

      category: z
        .string()
        .trim()
        .min(1, { message: "Adicione uma categoria válida." })
        .transform((val) => val.toLowerCase()),
        

      price: z
        .number({ message: "O preço deve ser um número." })
        .positive({ message: "O preço deve ser positivo." })
        
    });
    const {name , price , category ,description} = updateSchema.parse(req.body)

   const confirm_id = await prisma.product.findUnique({where: {id}})

   if(!confirm_id){
     res.status(404).json("opss produto nao encontrado!")
   }

    await prisma.product.update({
  where: { id },
  data: { name, price, category, description },
});
   res.status(201).json("alteraçoes feitas!")
}
}
export { ProductsController};
// vc do passado deixou uma mensagem para vc ms no update caso esqueça
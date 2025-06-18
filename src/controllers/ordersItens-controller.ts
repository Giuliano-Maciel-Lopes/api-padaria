import { prisma } from "@/database/prisma.js";
import { AppError } from "@/utils/app-error.js";
import { Request, Response } from "express";
import z from "zod";

class OrdersItensController {
  async create(req: Request, res: Response) {
    const schema = z.object({
      orderId: z.string().uuid(), // obrigatório para vincular os itens ao pedido
      items: z.array(
        z.object({
          productId: z.string().uuid(),
          quantity: z.number().int().min(1),
        })
      ),
    });

    const { items, orderId } = schema.parse(req.body);

    const productIds = items.map((item) => item.productId);

    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
    });
console.log("Produtos encontrados:", products);
    const orderItemsData = items.map((item) => {

      const product = products.find(p => p.id === item.productId);

      if (!product) {
     throw new AppError("product nao encontrado " , 404)
      }

      return {
        orderId,
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: product.price, 
      };

    });

    await prisma.orderItem.createMany({data: orderItemsData})
    console.log(products)

    res.json({message: orderItemsData});
  }
  
}
export { OrdersItensController };

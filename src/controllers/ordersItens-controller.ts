import { prisma } from "@/database/prisma.js";
import { AppError } from "@/utils/app-error.js";
import { Request, Response } from "express";
import { orderItensParamsSchema } from "@/schema/orderItens/create.js";
import { createOrderItemsSchema } from "@/schema/orderItens/create.js";
import { schemaBodyQuantity } from "@/schema/orderItens/quantity.js";
import { orderItemIdParamsSchema } from "@/schema/orderItens/quantity.js";

class OrdersItensController {
  async create(req: Request, res: Response) {
    const { orderId } = orderItensParamsSchema.parse(req.params);
    const { items } = createOrderItemsSchema.parse(req.body);

    const productIds = items.map((item) => item.productId);

    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
    });

    console.log("Produtos encontrados:", products);

    
    for (const item of items) {
      const product = products.find((p) => p.id === item.productId);

      if (!product) {
        throw new AppError("product nao encontrado", 404);
      }

      // Verifica se o item já existe para este pedido e produto
      const existingOrderItem = await prisma.orderItem.findFirst({
        where: { orderId, productId: item.productId },
      });

      if (existingOrderItem) {
        // Atualiza somando a quantidade
        await prisma.orderItem.update({
          where: { id: existingOrderItem.id },
          data: { quantity: existingOrderItem.quantity + item.quantity },
        });
      } else {
        // Cria novo item
        await prisma.orderItem.create({
          data: {
            orderId,
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: product.price,
          },
        });
      }
    }

    res.json({ message: "Itens do pedido atualizados/criados com sucesso." });
  }

  async index(req: Request, res: Response) {
    const { orderId } = orderItensParamsSchema.parse(req.params);

    const products = await prisma.orderItem.findMany({ where: { orderId } });
    res.json(products);
  }

  async updateQuantity(req: Request, res: Response) {
    const { quantity } = schemaBodyQuantity.parse(req.body);

    const { orderItemId } = orderItemIdParamsSchema.parse(req.params);

    const product = await prisma.orderItem.updateMany({
      data: { quantity },
      where: { id: orderItemId },
    });
    res.json("alterada quantidade de product");
  }
}
export { OrdersItensController };

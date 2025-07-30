import { prisma } from "@/database/prisma.js";
import { AppError } from "@/utils/app-error.js";
import { Request, Response } from "express";
import { orderItensParamsSchema } from "@/schema/orderItens/create.js";
import { createOrderItemsSchema } from "@/schema/orderItens/create.js";
import { schemaBodyQuantity } from "@/schema/orderItens/quantity.js";
import { orderItemIdParamsSchema } from "@/schema/orderItens/quantity.js";
import { creatUpsertOrderItems } from "@/services/controller/orderitens/OrdersItenscreate.js";

class OrdersItensController {
  async create(req: Request, res: Response) {
    const { orderId } = orderItensParamsSchema.parse(req.params);
    const { items } = createOrderItemsSchema.parse(req.body);

    await creatUpsertOrderItems(orderId , items)

    res.json({ message: "Itens do pedido atualizados/criados com sucesso." });
  }

  async index(req: Request, res: Response) {
    const { orderId } = orderItensParamsSchema.parse(req.params);

    const products = await prisma.orderItem.findMany({ where: { orderId } });
    res.json(products);
  }
   async remove(req: Request, res: Response) {
  const {id} = orderItemIdParamsSchema.parse(req.params)

  await prisma.orderItem.deleteMany({where:{id}})

    
    res.json("Product removido")
   }
  

  async updateQuantity(req: Request, res: Response) {
    const { quantity } = schemaBodyQuantity.parse(req.body);

    const { id } = orderItemIdParamsSchema.parse(req.params);

    const product = await prisma.orderItem.updateMany({
      data: { quantity },
      where: { id },
    });
    res.json("alterada quantidade de product");
  }
  
}
export { OrdersItensController };

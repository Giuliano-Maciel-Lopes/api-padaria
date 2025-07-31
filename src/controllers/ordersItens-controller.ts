import { prisma } from "@/database/prisma.js";
import { AppError } from "@/utils/app-error.js";
import { Request, Response } from "express";
import { orderItensParamsSchema } from "@/schema/orderItens/create.js";
import { createOrderItemsSchema } from "@/schema/orderItens/create.js";
import { schemaBodyQuantity } from "@/schema/orderItens/quantity.js";
import { orderItemIdParamsSchema } from "@/schema/orderItens/quantity.js";
import { creatUpsertOrderItems } from "@/services/controller/orderitens/OrdersItenscreate.js";
import { updateTotalAmount } from "@/services/controller/orderitens/UpdatadeTotal.js";

class OrdersItensController {
  async create(req: Request, res: Response) {
    const { orderId } = orderItensParamsSchema.parse(req.params);
    const { items } = createOrderItemsSchema.parse(req.body);

    await creatUpsertOrderItems(orderId, items);

    res.json({ message: "Itens do pedido atualizados/criados com sucesso." });
  }

  async index(req: Request, res: Response) {
    const { orderId } = orderItensParamsSchema.parse(req.params);

    const products = await prisma.orderItem.findMany({ where: { orderId } });
    res.json(products);
  }
  async remove(req: Request, res: Response) {
    const { id } = orderItemIdParamsSchema.parse(req.params);

    // Busca o orderItem para pegar o orderId
    const orderItem = await prisma.orderItem.findUnique({ where: { id } });

    if (!orderItem) {
      return res.status(404).json({ error: "Order item não encontrado" });
    }

    // Deleta o item
    await prisma.orderItem.delete({ where: { id } });

    // Atualiza o total do pedido
    await updateTotalAmount(orderItem.orderId);

    res.json({ message: "Produto removido com sucesso" });
  }

  async updateQuantity(req: Request, res: Response) {
  const { quantity } = schemaBodyQuantity.parse(req.body);
  const { id } = orderItemIdParamsSchema.parse(req.params);

  // Busca o item para pegar orderid
  const orderItem = await prisma.orderItem.findUnique({ where: { id } });
  if (!orderItem) {
    return res.status(404).json({ error: "Order item não encontrado" });
  }

  
  await prisma.orderItem.update({
    where: { id },
    data: { quantity },
  });

  // Atualiza o total do pedido
  await updateTotalAmount(orderItem.orderId);

  res.json({ message: "Quantidade do produto atualizada com sucesso" });
}

}
export { OrdersItensController };

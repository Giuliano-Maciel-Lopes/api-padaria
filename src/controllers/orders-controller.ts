import { prisma } from "@/database/prisma.js";
import { Request, Response } from "express";
import { paramsSchema, bodySchema } from "@/schema/orders/updatestaatus.js";
import { updateBodySchemaIsHome } from "@/schema/orders/updateishome.js";
import { orderStatusQuerySchema } from "@/schema/orders/indexorder.js";
import { orderSelect } from "@/services/controller/order/selectorderindexSHow.js";
import { Prisma } from "@prisma/client";
import { IndexWhere } from "@/services/controller/order/indexwhere.js";
import { updateDeliveredOrders } from "@/services/controller/order/updateDeliveredOrders.js";
import { showWhere } from "@/services/controller/order/showWhere.js";

class OrdersController {
  async create(req: Request, res: Response): Promise<void> {
    const userId = req.user!.id;

    const orders = await prisma.order.findFirst({
      where: { userId, status: "PROCESSING" },
    });

    if (!orders) {
      const newOrders = await prisma.order.create({
        data: { userId },
      });

      res
        .status(201)
        .json({ message: "Pedido criado com sucesso!", orders: newOrders });
      return;
    }
    res.json({ message: "pedido ja esta em andamento", orders: orders });
  }

  async index(req: Request, res: Response) {
    const role = req.user?.role;
    const userId = req.user?.id;

    const { status, search } = orderStatusQuerySchema.parse(req.query);

    const where = IndexWhere({ role, search, status, userId , deliveryPersonId:userId });

    const ordersUser = await prisma.order.findMany({
      where,
      select: orderSelect,
      orderBy: { createdAt: "asc" },
    });

    res.json(ordersUser);
  }

  async updateStatus(req: Request, res: Response) {
    const userId = req.user?.id;
    const role = req.user?.role
    if (!userId || !role) {
      return res.status(401).json({ error: "Usuário não autenticado" });
    }

    const { status } = bodySchema.parse(req.body);

    const { id } = paramsSchema.parse(req.params);

    await updateDeliveredOrders({ id, newStatus: status, res, userId ,role });

    
  }

  async updateIsHome(req: Request, res: Response) {
    const { id } = paramsSchema.parse(req.params);
    const { isHome } = updateBodySchemaIsHome.parse(req.body);

    await prisma.order.update({ where: { id }, data: { isHome } });

    res
      .status(200)
      .json({ message: "Status de entrega atualizado com sucesso." });
  }

  async delete(req: Request, res: Response) {
    const { id } = paramsSchema.parse(req.params);

    // 1. Deleta itens do pedido
    await prisma.orderItem.deleteMany({
      where: { orderId: id },
    });

    // 2. Deleta o pedido
    await prisma.order.delete({
      where: { id },
    });

    res.status(200).json({ message: "Pedido cancelado com sucesso." });
  }

  async show(req: Request, res: Response): Promise<void> {
    const role = req.user?.role 
    const userId = req.user?.id;
    if(!userId || !role){
      res.status(404).json("usuario nao autenticado")
      return
    }


    const { id } = paramsSchema.parse(req.params);
    const where =  showWhere({deliveryPersonId:userId , id ,role , userId})

    const order = await prisma.order.findFirst({
      where,
      select: orderSelect,
    });

    if (!order) {
      res.status(404).json({ message: "Pedido não encontrado." });
      return;
    }

    res.json(order);
  }
}
export { OrdersController };

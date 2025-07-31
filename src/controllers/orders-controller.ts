import { prisma } from "@/database/prisma.js";
import { Request, Response } from "express";
import { paramsSchema, bodySchema } from "@/schema/orders/updatestaatus.js";
import { updateBodySchemaIsHome } from "@/schema/orders/updateishome.js";
import { orderStatusQuerySchema } from "@/schema/orders/indexorder.js";

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
    res.json({message:"pedido ja esta em andamento" , orders:orders})
  }

  async index(req: Request, res: Response) {
    const isAdm = req.user?.role === "ADMIN";

    const { status } = orderStatusQuerySchema.parse(req.query);

    const baseWhere = isAdm ? {} : { userId: req.user?.id }; // admin ver tudo 
    const statusrole = status ? { ...baseWhere, status } : baseWhere;

    const ordersUser = await prisma.order.findMany({
      where: statusrole,

      select: {
        totalAmount: true,
        status: true,
        id: true,
        isHome: true,

        items: {
          select: {
            id: true,
            quantity: true,
            unitPrice: true,
            product: { select: { name: true, imageUrl: true, category: true } },
          },
        },
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    res.json(ordersUser);
  }

  async updateStatus(req: Request, res: Response) {
    const { status } = bodySchema.parse(req.body);

    const { id } = paramsSchema.parse(req.params);

    const update = await prisma.order.update({
      where: { id },
      data: { status },
    });

    res.json("status do pedido atualizado para " + update.status);
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
    const { id } = paramsSchema.parse(req.params);

    const order = await prisma.order.findUnique({
      where: { id },
      select: {
        id: true,
        status: true,
        totalAmount: true,
        user: { select: { name: true } },
        items: {
          select: {
            quantity: true,
            unitPrice: true,
            product: { select: { name: true } },
          },
        },
      },
    });

    if (!order) {
      res.status(404).json({ message: "Pedido não encontrado." });
      return;
    }

    res.json({ order });
  }
}
export { OrdersController };

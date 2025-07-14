import { prisma } from "@/database/prisma.js";
import { promises } from "dns";
import { Request, Response } from "express";
import z from "zod";

class OrdersController {
  async create(req: Request, res: Response): Promise<void> {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: "Usuário não autenticado." });
      return;
    }

    // Verifica se já tem pedido em processamento
    const orders = await prisma.order.findMany({
      where: { userId, status: "PROCESSING" },
    });

    if (orders.length === 0) {
      const newOrders = await prisma.order.create({
        data: { userId },
      });

      res
        .status(201)
        .json({ message: "Pedido criado com sucesso!", orders: newOrders });
      return;
    }
    res.status(200).json({ message: "Pedido em andamento já existe." , orders: orders[0] });
  }

  async index(req: Request, res: Response) {
    const isAdm = req.user?.role === "ADMIN";

    const ordersUser = await prisma.order.findMany({
      where: isAdm ? {} : { userId: req.user?.id },

      select: {
        totalAmount: true,
        status: true,
        id: true,

        items: {
          select: {
            quantity: true,
            unitPrice: true,
            product: { select: { name: true } },
          },
        },
        user: {
          select: { name: true },
        },
      },
    });

    const ordersWithTotal = ordersUser.map((order) => {
      const totalAmount = order.items.reduce((acc, item) => {
        return acc + item.quantity * item.unitPrice;
      }, 0);

      return {
        ...order, // espalha os dados do pedido atual (order)
        totalAmount, // adiciona o total calculado
      };
    });

    res.json(ordersWithTotal);
  }

  async updateStatus(req: Request, res: Response) {
    const paramsSchema = z.object({
      idOrders: z.string().uuid(),
    });
    const bodySchema = z.object({
      status: z.enum(["PROCESSING", "SHIPPED", "DELIVERED"]),
    });
    const { status } = bodySchema.parse(req.body);

    const { idOrders } = paramsSchema.parse(req.params);

    const update = await prisma.order.update({
      where: { id: idOrders },
      data: { status },
    });

    res.json("status do pedido atualizado para " + update.status);
  }
  async delete(req: Request, res: Response) {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });
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
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

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

    const totalAmount = order.items.reduce((acc, item) => {
      return acc + item.quantity * item.unitPrice;
    }, 0);

    res.json({ ...order, totalAmount });
  }
}
export { OrdersController };

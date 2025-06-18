import { prisma } from "@/database/prisma.js";
import { Request, Response } from "express";
import z from "zod";

class OrdersController {
  async create(req: Request, res: Response): Promise<void> {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: "Usuário não autenticado." });
      return;
    }

    await prisma.order.create({ data: { userId: userId } });
    res.status(200).json("criando pedido...");
  }

  async index(req: Request, res: Response) {
    const ordersUser = await prisma.order.findMany({
      where: { userId: req.user?.id },
      select: {
        totalAmount: true,
        status: true,

        items: {
          select: {
            quantity: true,
            unitPrice: true,
            product: { select: { name: true } },
            
          },
        },
      },
    });

    res.json(ordersUser);
  }

  async updateStatus(req: Request, res: Response) {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });
    const bodySchema = z.object({
      status: z.enum(["PROCESSING", "SHIPPED", "DELIVERED"]),
    });
    const { status } = bodySchema.parse(req.body);

    const { id } = paramsSchema.parse(req.params);

    await prisma.order.update({ where: { id }, data: { status } });

    res.json("status do pedido atualizado");
  }

  /*async updateAmount(req: Request, res: Response) { // fazer ainda inclopeto
    const paramsSchema = z.object({
      id: z.string().uuid(), 
    });
    const bodySchema = z.object({
      totalAmount: 
    });
    const { totalAmount } = bodySchema.parse(req.body);

    const { id } = paramsSchema.parse(req.params);

    await prisma.order.update({ where: { id }, data: {  } });

    res.json("status do pedido atualizado");
  }*/
}

export { OrdersController };

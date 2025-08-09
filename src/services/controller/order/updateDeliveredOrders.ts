import { prisma } from "@/database/prisma.js";
import type { Response } from "express";
import type { OrderStatus } from "@prisma/client";
type UpdateDeliveredOrders = {
  id: string;
  res: Response;
  newStatus: OrderStatus;
};

export async function updateDeliveredOrders({id , newStatus ,res}: UpdateDeliveredOrders) {
  const order = await prisma.order.findUnique({ where: { id } });

  if (!order) {
    return res.status(404).json({ error: "Nenhum pedido encontrado" });
  }

  const allowedCurrentStatuses = ["ORDER_FINISH", "DELIVERED"];

  if (!allowedCurrentStatuses.includes(order.status)) {
    return res
      .status(403)
      .json({ error: "Não é possível atualizar este pedido neste status" });
  }

  const updatedOrder = await prisma.order.update({
    where: { id },
    data: { status: newStatus },
  });

  return res.json({ message: "Pedido atualizado com sucesso", updatedOrder });
}

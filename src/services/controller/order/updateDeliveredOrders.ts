import { prisma } from "@/database/prisma.js";
import type { Response } from "express";
import type { OrderStatus } from "@prisma/client";
import { Role } from "@/types/enum.js";
type UpdateDeliveredOrders = {
  id: string;
  res: Response;
  newStatus: OrderStatus;
  userId: string;
  role: Role;
};

export async function updateDeliveredOrders({
  userId,
  id,
  newStatus,
  res,
  role,
}: UpdateDeliveredOrders) {
  const order = await prisma.order.findUnique({ where: { id } });

  if (!order) {
    return res.status(404).json({ error: "Nenhum pedido encontrado" });
  }

  const allowedCurrentStatuses = ["ORDER_FINISH", "DELIVERED"];
  if (role === "DELIVERY_PERSON") {
    if (!allowedCurrentStatuses.includes(order.status)) {
      return res
        .status(403)
        .json({ error: "Não é possível atualizar este pedido neste status" });
    }
  }
  const updatedOrder = await prisma.order.update({
    where: { id },
    data: { status: newStatus, deliveryPersonId: userId },
  });

  return res.json({ message: "Pedido atualizado com sucesso", updatedOrder });
}

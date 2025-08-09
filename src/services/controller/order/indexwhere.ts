import type { Prisma, OrderStatus } from "@prisma/client";
import type { Role } from "@/types/enum.js";

type IndexWhereInput = {
  role?: Role;
  userId?: string;
  status?: OrderStatus;
  search?: string;
};

export function IndexWhere({ search, status, role, userId }: IndexWhereInput) {
  let where: Prisma.OrderWhereInput = {};

  if (role === "ADMIN") {
    // Admin vê tudo
    where = {};
  } else if (role === "DELIVERY_PERSON") {
    
    if (status === "ORDER_FINISH") {
      // Entregador vê todos os pedidos finalizados
      where = { status };
    } else {
      // Entregador vê só os pedidos dele
      where = {
        userId,
        ...(status && { status }),
      };
    }
  } else {
    // Qualquer outro role vê só seus próprios pedidos
    where = {
      userId,
      ...(status && { status }),
    };
  }

  // Filtro de busca por nome do cliente
  if (search) {
    where.user = {
      is: {
        name: {
          contains: search,
          mode: "insensitive",
        },
      },
    };
  }

  return where;
}

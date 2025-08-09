// fora da função:
import { Prisma } from "@prisma/client";
export const orderSelect: Prisma.OrderSelect = {
  totalAmount: true,
  status: true,
  id: true,
  isHome: true,
  items: {
    select: {
      id: true,
      quantity: true,
      unitPrice: true,
      product: {
        select: {
          name: true,
          imageUrl: true,
          category: true,
        },
      },
    },
  },
  user: {
    select: {
      name: true,
      userInfo: {
        select: {
          city: true,
          phone: true,
          houseNumber: true,
          neighborhood: true,
          street: true,
        },
      },
    },
  },
  deliveryPerson: {
    select: {
      name: true,
    },
  },
};

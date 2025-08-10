import { Role } from "@prisma/client";

type ShowWhere = {
  role: Role;
  userId: string;
  deliveryPersonId: string;
  id: string;
};

export function showWhere({ role, userId, deliveryPersonId, id }: ShowWhere) {
  if (role === "ADMIN") {
    return { id };
  } else if (role === "DELIVERY_PERSON") {
    return { id, deliveryPersonId };
  } else {
    return { id, userId };
  }
}

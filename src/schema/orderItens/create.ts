import { z } from "zod";

export const orderItensParamsSchema = z.object({
  orderid: z.string().uuid({ message: "ID inválido, deve ser um UUID" }),
});

export const createOrderItemsSchema = z.object({
  items: z.array(
    z.object({
      productId: z.string().uuid({ message: "ID do produto inválido" }),
      quantity: z.number().int().min(1, { message: "Quantidade mínima é 1" }),
    })
  ),
});

export type OrderParamsInput = z.infer<typeof orderItensParamsSchema>;
export type CreateOrderItemsInput = z.infer<typeof createOrderItemsSchema>;

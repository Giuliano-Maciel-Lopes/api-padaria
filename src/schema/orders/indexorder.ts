import { z } from "zod";

export const orderStatusQuerySchema = z.object({
  status: z.enum([
    "PROCESSING",
    "SHIPPED",
   "ITENS_PROCESSING",
    "ORDER_FINISH",
    "DELIVERED",
  ]).optional(),
  search: z.string().optional(),
});

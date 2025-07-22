import { z } from "zod";

export const orderStatusQuerySchema = z.object({
  status: z.enum([
    "PROCESSING",
    "SHIPPED",
    "COMPLETE",
    "ORDER_FINISH",
    "DELIVERED",
  ]).optional()
});

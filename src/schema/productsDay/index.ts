import { z } from "zod";

export const queryProductDaySchema = z.object({
  name: z
    .string()
    .transform((val) => val.toLowerCase())
    .optional(),
});

export type QueryProductDayInput = z.infer<typeof queryProductDaySchema>;

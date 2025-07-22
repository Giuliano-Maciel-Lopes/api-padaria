import { z } from "zod";

const optionalNonEmptyString = () =>
  z
    .string()
    .transform((val) => (val.trim() === "" ? undefined : val.trim()))
    .optional();

export const updateProductBodySchema = z.object({
  name: optionalNonEmptyString().refine(
    (val) => val === undefined || val.length >= 3,
    { message: "O nome deve ter no mínimo 3 caracteres." }
  ),

  description: optionalNonEmptyString(),

  category: optionalNonEmptyString().transform((val) => val?.toLowerCase()),

 price: z.coerce.number().positive().optional(),

  imageUrl: z.string().optional(),
});

export type UpdateInput = z.infer<typeof updateProductBodySchema>;

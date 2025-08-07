import { z } from "zod";

export const updateProductBodySchema = z.object({
  name: z.string().min(3, "O nome deve ter no mínimo 3 caracteres.").optional(),

  description: z.string().optional(),

  category: z
    .string()
    .transform((val) => val.toLowerCase())
    .optional(),

  price: z.preprocess((val) => {
    if (val === "" || val === null || val === undefined) return undefined;
    const number = Number(val);
    return isNaN(number) ? undefined : number;
  }, z.number().positive().optional()),

  imageUrl: z.string().optional(),

  isVitrine: z.boolean().optional(),

  stock: z.preprocess((val) => {
    if (val === "" || val === null || val === undefined) return undefined;
    const number = Number(val);
    return isNaN(number) ? undefined : number;
  }, z.number().int().nonnegative().optional()),

  
});

export type UpdateInput = z.infer<typeof updateProductBodySchema>;

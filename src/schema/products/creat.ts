import { z } from "zod";

export const createProductSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, { message: "O nome deve ter no mínimo 3 caracteres." }),
  description: z.string().optional(),
  category: z
    .string()
    .trim()
    .min(1, { message: "Adicione uma categoria válida." })
    .transform((val) => val.toLowerCase()),
  price: z.coerce
    .number({ message: "O preço deve ser um número." })
    .positive({ message: "O preço deve ser positivo." }),
  imageUrl: z
    .string()  
    .optional(),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;

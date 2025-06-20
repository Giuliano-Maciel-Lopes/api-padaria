import { z } from "zod";

export const createProductDaySchema = z.object({
  productName: z
    .string()
    .min(1, { message: "Nome do produto é obrigatório." }),
    

  dayName: z
    .string()
    .min(1, { message: "Nome do dia é obrigatório." }),
    

  stock: z
    .number({ invalid_type_error: "Estoque deve ser um número." })
    .int({ message: "Estoque deve ser um número inteiro." })
    .min(0, { message: "Estoque não pode ser negativo." }),
});

export type CreateProductDayInput = z.infer<typeof createProductDaySchema>;

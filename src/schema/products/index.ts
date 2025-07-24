import { z } from "zod";
import { schemaCategory } from "@/utils/category.js";

export const indexProductQuerySchema = z.object({
  category: z
    .string()
    .optional()
    .transform((val) => val?.toLowerCase())
    .refine(
      (val) => !val || schemaCategory.safeParse(val).success,
      { message: "Categoria inválida" }
    ),
});

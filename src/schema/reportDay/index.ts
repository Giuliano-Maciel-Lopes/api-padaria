import z from "zod";

export const QuerySchemaReport = z.object({
  date: z
    .string()
    .optional()
    .refine((val) => !val || !isNaN(Date.parse(val)), {
      message: "Data inválida. Use formato ISO: YYYY-MM-DD",
    }),
});

import z from "zod";

export const indexProductQuerySchema = z.object({
  category: z
    .string()
    .optional()
    .transform((val) => val?.toLowerCase()),
});

export type IndexQueryInput = z.infer<typeof indexProductQuerySchema>;
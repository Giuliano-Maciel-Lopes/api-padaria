import z from "zod";

export const idParamSchema = z.object({
  id: z.string().uuid({ message: "ID inválido, deve ser um UUID" }),
});

export type IdParamInput = z.infer<typeof idParamSchema>;

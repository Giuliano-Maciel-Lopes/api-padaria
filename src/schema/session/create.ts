import { z } from "zod";

export const createSessionSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: "email invalido" })
    .toLowerCase(),
  password: z
    .string()
    .trim()
    .min(6, { message: "e necessario no minimo 6 caracteres" }),
});

export type CreateSessionInput = z.infer<typeof createSessionSchema>;

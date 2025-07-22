import { z } from "zod";

export const createUserInfoSchema = z.object({
    street: z.string().trim().min(1, "Rua é obrigatória"),
  houseNumber: z.string().trim().min(1, "Número da casa é obrigatório"),
  neighborhood: z.string().trim().min(1, "Bairro é obrigatório"),
  city: z.string().trim().min(1, "Cidade é obrigatória"),
  phone: z.string().trim().min(8, "Número de telefone inválido"),
});

export type CreateUserInfoInput = z.infer<typeof createUserInfoSchema>;

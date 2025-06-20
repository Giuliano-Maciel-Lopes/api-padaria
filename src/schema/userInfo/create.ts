import { z } from "zod";

export const createUserInfoSchema = z.object({
  address: z.string().trim().min(1, "Endereço é obrigatório"),
  neighborhood: z.string().trim().min(1, "Bairro é obrigatório"),
  city: z.string().trim().min(1, "Cidade é obrigatória"),
  phoneNumber: z.string().trim().min(8, "Número de telefone inválido"),
});

export type CreateUserInfoInput = z.infer<typeof createUserInfoSchema>;

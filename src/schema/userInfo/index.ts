import z from "zod";

export const parasChemaUserInfo = z.object({
  userId: z.string().uuid("ID de usuário inválido"),
});

import { Request, Response } from "express";
import { hash } from "bcrypt";
import z from "zod";
import { prisma } from "@/database/prisma.js";

import { AppError } from "@/utils/app-error.js";

class UsersController {
  async create(req: Request, res: Response) {
    const bodySchema = z.object({
      name: z
        .string()
        .trim()
        .min(3, { message: "necessario no min 3 caracteres" }),
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
    const { name, email, password } = bodySchema.parse(req.body);

   

    const hashedPassword = await hash(password, 8);

    const checkEmail = await prisma.user.findUnique({ where: { email } });

    if (checkEmail) {
      throw new AppError("esse email já esta vinculado a uma conta!");
    }

    await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });
    res.status(200).json("cadastrado");
  }
   
}

export { UsersController };

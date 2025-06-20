import { Request, Response } from "express";
import { hash } from "bcrypt";
import {createUserSchema} from "../schema/user/create.js"
import { prisma } from "@/database/prisma.js";
import { AppError } from "@/utils/app-error.js";



class UsersController {
  async create(req: Request, res: Response) {
  
    const { name, email, password } = createUserSchema.parse(req.body);
    
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

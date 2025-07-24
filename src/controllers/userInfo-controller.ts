import { prisma } from "@/database/prisma.js";
import { Request, Response } from "express";
import { createUserInfoSchema } from "@/schema/userInfo/create.js";
import { parasChemaUserInfo } from "@/schema/userInfo/index.js";

class UserInfoController {
  async create(req: Request, res: Response): Promise<void> {
    if (!req.user?.id) {
      res
        .status(401)
        .json({ message: "Usuário não autenticado , conecta-se a uma conta" });
      return;
    }
    const existingUserInfo = await prisma.userInfo.findUnique({
      where: { userId: req.user.id },
    });

    if (existingUserInfo) {
      res.status(400).json({
        message: "Usuário já possui informações cadastradas.",
      });
      return;
    }

    const data = createUserInfoSchema.parse(req.body);

    await prisma.userInfo.create({
      data: { userId: req.user.id, ...data },
    });

    res.status(201).json("informaçoes do usuario cadastrado");
    return;
  }
  async index(req: Request, res: Response): Promise<void> {
    const role = req.user?.role;
    const sessionUserId = req.user?.id;
    const { userId } = parasChemaUserInfo.parse(req.params);

    if (role === "CUSTOMER") {
      if (userId !== sessionUserId) {
        res.status(403).json({ message: "Acesso negado." });
        return;
      }
    }

    const userInfo = await prisma.userInfo.findFirst({
      where: { userId: sessionUserId },
      select: {
        id:true,
        city: true,
        houseNumber: true,
        phone: true,
        neighborhood: true,
        street: true,
      },
    });

    res.status(200).json(userInfo);
  }
}

export { UserInfoController };

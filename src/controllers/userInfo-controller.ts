import { prisma } from "@/database/prisma.js";
import { Request, Response } from "express";
import { createUserInfoSchema } from "@/schema/userInfo/create.js";
import { parasChemaUserInfo } from "@/schema/userInfo/index.js";
import { bodySchemaUpdateUserinfo } from "@/schema/userInfo/update.js";
import { json } from "stream/consumers";

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
    const { userId } = parasChemaUserInfo.parse(req.params);

    const userInfo = await prisma.userInfo.findFirst({
      where: { userId },
      select: {
        id: true,
        city: true,
        houseNumber: true,
        phone: true,
        neighborhood: true,
        street: true,
      },
    });

    res.status(200).json(userInfo);
  }
  async update(req: Request, res: Response): Promise<void> {
    const userId = req.user?.id;
      if (!userId) {
    res.status(401).json({ message: "Usuário não autenticado" });
    return
  }
    const data = bodySchemaUpdateUserinfo.parse(req.body);

    const userInfo = await prisma.userInfo.update({ where: { userId }, data });
    res.json(userInfo);
  }
}

export { UserInfoController };

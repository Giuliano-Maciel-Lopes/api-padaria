import { prisma } from "@/database/prisma.js";
import { Request, Response } from "express";
import { z } from "zod";



class UserInfoController {

  async create(req:Request , res:Response) {
    const bodyschema = z.object({
      address: z.string().trim().min(1, "Endereço é obrigatório"),
      neighborhood: z.string().trim().min(1, "Bairro é obrigatório"),
      city: z.string().trim().min(1, "Cidade é obrigatória"),
      phoneNumber: z.string().trim().min(8, "Número de telefone inválido"),
    });

    if (!req.user?.id) {
      return res
        .status(401)
        .json({ message: "Usuário não autenticado , conecta-se a uma conta" });
    }

    const { address, neighborhood, city, phoneNumber } = bodyschema.parse(
      req.body
    );

    await prisma.userInfo.create({
      data: { userId: req.user.id, address, neighborhood, city, phoneNumber },
    });
    return res.status(201).json("informaçoes do usuario cadastrado");
  
    
  }
 
  
}
export {UserInfoController};

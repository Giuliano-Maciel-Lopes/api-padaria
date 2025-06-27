import { prisma } from "@/database/prisma.js";
import { Request, Response } from "express";
import { createUserInfoSchema } from "@/schema/userInfo/create.js";



class UserInfoController {

  async create(req:Request , res:Response):Promise<void> {
    
    if (!req.user?.id) {
       res
        .status(401)
        .json({ message: "Usuário não autenticado , conecta-se a uma conta" })
        return;
    }

    const { address, neighborhood, city, phoneNumber } = createUserInfoSchema.parse(
      req.body
    );

    await prisma.userInfo.create({
      data: { userId: req.user.id, address, neighborhood, city, phoneNumber },
    });
   
    res.status(201).json("informaçoes do usuario cadastrado");
    return
  
    
  }
 
  
}
export {UserInfoController};

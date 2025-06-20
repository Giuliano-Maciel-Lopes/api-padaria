import { prisma } from "@/database/prisma.js";
import { AppError } from "@/utils/app-error.js";
import { compare } from "bcrypt";
import { Request, Response } from "express";
import { authConfig } from "@/config/auth.js";
import jwt from 'jsonwebtoken';

import { createSessionSchema } from "@/schema/session/create.js";

class SessionsController {
  async create(req: Request, res: Response) {
  
    const{email , password} = createSessionSchema.parse(req.body)

   const userReg =  await prisma.user.findFirst({where:{email}})

   if(!userReg){
    throw new AppError("email ou senha invalido!");
    
   }
   const match = await compare(password , userReg.password)

   if(!match){
     throw new AppError("email ou senha invalido!");
   }

   const {secret, expiresIn} = authConfig.jwt

    const token = jwt.sign({role: userReg.role ?? "CUSTOMER"} , secret , {
        subject: userReg.id,
        expiresIn
    })

    const {password: hashedPassword , ...datauser} =userReg


    res.json({token , datauser});
    
  }
}

export { SessionsController };

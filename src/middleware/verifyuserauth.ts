import { Request, Response, NextFunction } from "express"
import { AppError } from "@/utils/app-error.js"
import type { Role } from "@/types/enum.ts";


function verifyUserAuthorization(rolee: Role[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if(!req.user){
        throw new AppError("ops Não autorizado!!")
    }
    if(!rolee.includes(req.user.role)){
        throw new AppError("ops Não autorizado!!")

    }
  next()
  }
} 
export {verifyUserAuthorization}


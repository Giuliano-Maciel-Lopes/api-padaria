import { Request, Response, NextFunction } from "express"
import { AppError } from "@/utils/app-error.js"
import { Role } from "@/types/enum.js"

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
// Giuliano: poderia juntar as duas verificações numa só,
// mas como é para meu portfólio, deixo separado para ficar mais claro.

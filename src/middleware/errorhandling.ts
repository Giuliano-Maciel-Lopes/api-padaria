import { ZodError } from "zod";
import { AppError } from "@/utils/app-error.js";
import { ErrorRequestHandler } from "express";

const errorHandling : ErrorRequestHandler =(
    error,
    req,
    res ,
    next
   
)=>{
    if(error instanceof AppError){
   res.status(error.statusCode).json({message: error.message})
     return

    }
    if(error instanceof ZodError){
   res.status(400).json({message: "erro de validaçao" , issues:error.format() })
    return

    }

     res.status(500).json({mensage: error.message})
    return

    


}
export  {errorHandling}
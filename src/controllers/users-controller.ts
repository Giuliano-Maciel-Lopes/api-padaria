import { Request , Response  } from "express";
import { json } from "stream/consumers";
import z from "zod";


class UsersController  {

    async create(req:Request , res:Response ){
        const bodySchema = z.object({
            name: z.string().trim().min(3, {message: "necessario no min 3 caracteres"}),
            email:z.string().trim().email({message:"email invalido"}).toLowerCase(), 
            password: z.string().trim().min(6 , {message: "e necessario no minimo 6 caracteres"})
        })
        const  {name , email , password} = bodySchema.parse(req.body)

        res.json({name , email , password})
   
       
       

    }

}

export {UsersController}
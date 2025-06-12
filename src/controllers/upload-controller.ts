import { Request, Response } from "express";

class UploadsController {

    create(req:Request , res:Response ){
        res.json("foto enviada")

    }

}
export {UploadsController}
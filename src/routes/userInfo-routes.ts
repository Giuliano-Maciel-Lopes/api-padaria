
import { UserInfoController } from "@/controllers/userInfo-controller.js";
import { Router } from "express";



const userInfoRoutes = Router()

const userInfoController = new UserInfoController

userInfoRoutes.post("/", userInfoController.create);



export {userInfoRoutes}
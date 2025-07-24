
import { UserInfoController } from "@/controllers/userInfo-controller.js";
import { verifyUserAuthorization } from "@/middleware/verifyuserauth.js";
import { Role } from "@/types/enum..js";

import { Router } from "express";



const userInfoRoutes = Router()

const userInfoController = new UserInfoController

userInfoRoutes.post("/", userInfoController.create);
userInfoRoutes.get("/:userId", verifyUserAuthorization([Role.CUSTOMER] ) , userInfoController.index);




export {userInfoRoutes}
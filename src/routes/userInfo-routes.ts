import { UserInfoController } from "@/controllers/userInfo-controller.js";
import { verifyUserAuthorization } from "@/middleware/verifyuserauth.js";

import { Router } from "express";

const userInfoRoutes = Router();

const userInfoController = new UserInfoController();

userInfoRoutes.post("/", userInfoController.create);
userInfoRoutes.get(
  "/:userId",
  verifyUserAuthorization(["CUSTOMER"]),
  userInfoController.index
);
userInfoRoutes.patch(
  "/update",
  verifyUserAuthorization(["CUSTOMER"]),
  userInfoController.update
);

export { userInfoRoutes };

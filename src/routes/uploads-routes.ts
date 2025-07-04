import uploadConfig from "../config/upload.js"
import { UploadsController } from "@/controllers/upload-controller.js";
import { verifyUserAuthorization } from "@/middleware/verifyuserauth.js";
import { Role } from "@/types/enum..js";
import { Router } from "express";
import multer from "multer";

const uploadsRoutes = Router();

const uploadsController = new UploadsController();

const upload = multer(uploadConfig.MULTER);

uploadsRoutes.post(
  "/",
  upload.single("file"),
  verifyUserAuthorization([Role.ADMIN , Role.STOCK]),
  uploadsController.create
);

export { uploadsRoutes };

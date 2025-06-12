import { storage } from "@/config/upload.js";
import { UploadsController } from "@/controllers/upload-controller.js";
import { verifyUserAuthorization } from "@/middleware/verifyuserauth.js";
import { Role } from "@prisma/client";
import { Router } from "express";
import multer from "multer";

const uploadsRoutes = Router();

const uploadsController = new UploadsController();

const update = multer({ storage: storage });

uploadsRoutes.post(
  "/",
  update.single("file"),
  verifyUserAuthorization([Role.ADMIN , Role.STOCK]),
  uploadsController.create
);

export { uploadsRoutes };

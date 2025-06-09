import { Router } from "express";
import { UsersController } from "@/controllers/users-controller.js";

const usersRoutes = Router()

const usersController = new UsersController

usersRoutes.get("/" , usersController.index)


export {usersRoutes}
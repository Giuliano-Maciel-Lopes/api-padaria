import { Router } from "express";
import { usersRoutes } from "./users-rotes.js";


const routes = Router()

routes.use("/users" , usersRoutes)

export {routes}
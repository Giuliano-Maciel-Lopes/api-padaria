import { Router } from "express";
import { ensureAuth} from "@/middleware/ensureauth.js";

import { usersRoutes } from "./users-rotes.js";
import { sessionsRoutes } from "./session-rotes.js";
import { uploadsRoutes } from "./uploads-routes.js";
import { productsRouter } from "./products-routes.js";
import { userInfoRoutes } from "./userInfo-routes.js";



const routes = Router()

routes.use("/users" , usersRoutes)
routes.use("/sessions" , sessionsRoutes)

routes.use(ensureAuth)
routes.use("/uploads" , uploadsRoutes)
routes.use("/products" , productsRouter)
routes.use("/user_infos" , userInfoRoutes)



export {routes}
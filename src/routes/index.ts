import { Router } from "express";
import { ensureAuth} from "@/middleware/ensureauth.js";

import { usersRoutes } from "./users-rotes.js";
import { sessionsRoutes } from "./session-rotes.js";
import { uploadsRoutes } from "./uploads-routes.js";
import { productsRouter } from "./products-routes.js";
import { userInfoRoutes } from "./userInfo-routes.js";
import { ordersRoutes } from "./order-routes.js";
import { ordersItensRoutes } from "./orderItens-routes.js";
import { stripeRoutes } from "./striper-routes.js";
import { reportDayRoutes } from "./reportDay-routes.js";




const routes = Router()

routes.use("/users" , usersRoutes)
routes.use("/sessions" , sessionsRoutes)
routes.use("/products" , productsRouter)
routes.use("/stripe", stripeRoutes)

routes.use(ensureAuth)
routes.use("/uploads" , uploadsRoutes)
routes.use("/user_infos" , userInfoRoutes)
routes.use("/orders" , ordersRoutes)
routes.use("/orders_itens" , ordersItensRoutes)
routes.use("/report_day" , reportDayRoutes )



export {routes}
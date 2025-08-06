import { Router } from "express";
import { ReportDayController } from "@/controllers/reportDay-controller.js";


const reportDayRoutes = Router()

const  reportDayController = new ReportDayController 

reportDayRoutes.get("/" , reportDayController.index)
reportDayRoutes.get("/years" , reportDayController.show)

export {reportDayRoutes}
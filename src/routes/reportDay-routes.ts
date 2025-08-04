import { Router } from "express";
import { ReportDayController } from "@/controllers/reportDay-controller.js";


const reportDayRoutes = Router()

const  reportDayController = new ReportDayController 

reportDayRoutes.get("/" , reportDayController.index)

export {reportDayRoutes}
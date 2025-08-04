import { prisma } from "@/database/prisma.js";
import { Request, Response } from "express";
import { dayjs } from "../utils/dayjs.js";
import { QuerySchemaReport } from "@/schema/reportDay/index.js";

const timezone = "America/Sao_Paulo";

class ReportDayController {
  async index(req: Request, res: Response): Promise<void> {
    const { date } = QuerySchemaReport.parse(req.query);

    const baseDate = date
      ? dayjs.tz(date, timezone)
      : dayjs().tz(timezone).subtract(1, "day");

    const initialDay = baseDate.startOf("day").toDate();
    const endDay = baseDate.endOf("day").toDate();

    const daysales = await prisma.dailySales.findFirst({
      where: {
        date: {
          gte: initialDay,
          lte: endDay,
        },
      },
    });

    if (!daysales) {
      res.status(404).json({ error: "Nenhuma venda registrada nesse dia." });
      return;
    }
  

    res.json(daysales);
  }
}

export { ReportDayController };

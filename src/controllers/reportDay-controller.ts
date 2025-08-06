import { Request, Response } from "express";
import { dayjs } from "../utils/dayjs.js";
import { QuerySchemaReport } from "@/schema/reportDay/index.js";
import { week } from "@/services/controller/reportIndex/week.js";
import { day } from "@/services/controller/reportIndex/day.js";
import { month } from "@/services/controller/reportIndex/month.js";
import { prisma } from "@/database/prisma.js";
import { months } from "dayjs";

const timezone = "America/Sao_Paulo";

class ReportDayController {
  async index(req: Request, res: Response): Promise<void> {
    const { date } = QuerySchemaReport.parse(req.query);
    const baseDate = dayjs.tz(
      date || dayjs().tz(timezone).subtract(1, "day"),
      timezone
    );

    const daySales = await day(baseDate);
    const weekSales = await week(baseDate);
    const monthSales = await month(baseDate);

    res.json({ daySales, weekSales, monthSales });
  }
  async show(req: Request, res: Response): Promise<void> {
    const monthname = dayjs.localeData().monthsShort();

    const initialDay = dayjs().startOf("year").toDate(); // 1º de janeiro
    const endDay = dayjs().endOf("year").toDate(); // 31 de dezembro

    const monthSales = await prisma.dailySales.findMany({
      where: {
        date: {
          gte: initialDay,
          lte: endDay,
        },
      },
    });

    const months = monthname.map((monthLabel, i) => {
      const totalSales = monthSales
        .filter((sale) => dayjs(sale.date).month() === i)
        .reduce((sum, sale) => sum + sale.totalSales, 0);

      return {
        month: monthLabel,
        totalSales,
      };
    });

    res.json({ months });
  }
}

export { ReportDayController };

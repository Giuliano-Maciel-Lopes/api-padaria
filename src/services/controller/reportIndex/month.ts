import { dayjs } from "../../../utils/dayjs.js";
import { prisma } from "@/database/prisma.js";

export async function month(baseDate: dayjs.Dayjs) {
 
  const initialDay = baseDate.startOf("month").toDate(); // dia 01
  const endDay = baseDate.endOf("month").toDate(); // dia 31 quem sabe

  const daysales = await prisma.dailySales.findMany({
    where: {
      date: {
        gte: initialDay,
        lte: endDay,
      },
    },
  });
 const totalAmountMonth = daysales.reduce((acc, item) => {
    return acc + item.totalSales;
  }, 0);
  const  ordersMonth =  daysales.length

  return {totalAmountMonth , ordersMonth}
}

import { dayjs } from "@/utils/dayjs.js";
import { prisma } from "@/database/prisma.js";

export async function week(baseDate: dayjs.Dayjs) {
  const startOfWeek = baseDate.startOf("week").toDate();
  const endOfWeek = baseDate.endOf("week").toDate();

  const sales = await prisma.dailySales.findMany({
    where: {
      date: {
        gte: startOfWeek,
        lte: endOfWeek,
      },
    },
  });

  const daysOfWeek = dayjs.localeData().weekdaysMin(); // nomes curtos: Dom, Seg, Ter, ...

return daysOfWeek.map((dayName, i) => {
  const sale = sales.find(s => dayjs(s.date).day() === i);
  return {
    day: dayName,
    totalSales: sale?.totalSales || 0,
  };
});

}

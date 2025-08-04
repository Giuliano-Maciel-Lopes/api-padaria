import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';
import { prisma } from '@/database/prisma.js';

dayjs.extend(utc);
dayjs.extend(timezone);

export { dayjs };

export async function reportDayCreate() {
  const timezone = "America/Sao_Paulo";
  const day = dayjs().tz(timezone);
  const initialDay = day.startOf("day").toDate();
  const endDay = day.endOf("day").toDate();

  const orders = await prisma.order.findMany({
    where: {
      status: "SHIPPED",
      createdAt: {
        gte: initialDay,
        lte: endDay,
      },
    },
    select: { totalAmount: true },
  });

  const totalAmountDay = orders.reduce((acc, orderDay) => acc + orderDay.totalAmount, 0);
  const totalOrders = orders.length;

  await prisma.dailySales.upsert({
    where: { date: day.startOf('day').toDate() },
    update: {
     totalSales: totalAmountDay,
      totalOrders: totalOrders,
    },
    create: {
      date: day.startOf('day').toDate(),
     totalSales: totalAmountDay,
      totalOrders: totalOrders,
    },
  });
}

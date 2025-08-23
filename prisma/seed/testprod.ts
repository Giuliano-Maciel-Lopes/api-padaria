import { prisma } from "@/database/prisma.js";

export async function ReportTestProd() {
  await prisma.dailySales.createMany({
    data: [
      { date: new Date("2025-08-04T03:00:00.000Z"), totalSales: 52.70, totalOrders: 8 },
      { date: new Date("2025-08-03T03:00:00.000Z"), totalSales: 1000.70, totalOrders: 20 },
      { date: new Date("2025-07-27T03:00:00.000Z"), totalSales: 433.30, totalOrders: 9 },
      { date: new Date("2025-07-23T03:00:00.000Z"), totalSales: 840.41, totalOrders: 2 },
      { date: new Date("2025-07-19T03:00:00.000Z"), totalSales: 362.30, totalOrders: 7 },
      { date: new Date("2025-07-14T03:00:00.000Z"), totalSales: 209.68, totalOrders: 8 },
      { date: new Date("2025-06-25T03:00:00.000Z"), totalSales: 771.55, totalOrders: 13 },
      { date: new Date("2025-06-24T03:00:00.000Z"), totalSales: 753.20, totalOrders: 6 },
      { date: new Date("2025-06-21T03:00:00.000Z"), totalSales: 479.39, totalOrders: 18 },
      { date: new Date("2025-06-12T03:00:00.000Z"), totalSales: 732.13, totalOrders: 18 },
      { date: new Date("2025-06-03T03:00:00.000Z"), totalSales: 141.39, totalOrders: 20 },
      { date: new Date("2025-05-26T03:00:00.000Z"), totalSales: 454.62, totalOrders: 2 },
      { date: new Date("2025-05-24T03:00:00.000Z"), totalSales: 752.92, totalOrders: 11 },
      { date: new Date("2025-05-23T03:00:00.000Z"), totalSales: 157.65, totalOrders: 14 },
      { date: new Date("2025-05-22T03:00:00.000Z"), totalSales: 374.57, totalOrders: 17 },
      { date: new Date("2025-05-20T03:00:00.000Z"), totalSales: 869.83, totalOrders: 2 },
      { date: new Date("2025-05-15T03:00:00.000Z"), totalSales: 486.60, totalOrders: 6 },
      { date: new Date("2025-05-01T03:00:00.000Z"), totalSales: 59.38, totalOrders: 17 },
      { date: new Date("2025-04-30T03:00:00.000Z"), totalSales: 211.35, totalOrders: 19 },
      { date: new Date("2025-04-12T03:00:00.000Z"), totalSales: 520.31, totalOrders: 6 },
      { date: new Date("2025-04-10T03:00:00.000Z"), totalSales: 142.47, totalOrders: 14 },
    ],
  });

  console.log("Seed de dailySales concluído.");
}

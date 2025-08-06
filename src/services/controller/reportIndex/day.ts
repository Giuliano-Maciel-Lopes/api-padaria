import {dayjs} from "../../../utils/dayjs.js"
import { prisma } from "@/database/prisma.js";

 
 export async function day( baseDate:dayjs.Dayjs){
 

    const initialDay = baseDate.startOf("day").toDate(); 
    const endDay = baseDate.endOf("day").toDate(); // 

    const daysales = await prisma.dailySales.findFirst({
      where: {
        date: {
          gte: initialDay,
          lte: endDay,
        },
      },
      
    });
     if (!daysales) {
    return {
      totalSales: 0,
      totalOrders: 0,
     
    };
  }
    return daysales

}
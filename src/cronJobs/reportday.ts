import cron from "node-cron";
import { reportDayCreate } from "@/services/cronjobs/reportcreatedayjobs.js";
// 2 59 por conta to horario de utc no caso as 23:50 no horario de sao apaulo
export function starReportDayJob() {
  cron.schedule("32 21 * * *", async () => {
    await reportDayCreate();
    console.log("Executando tarefa diária à 9:15 teste");
  });
}

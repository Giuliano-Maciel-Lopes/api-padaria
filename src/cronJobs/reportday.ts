import cron from "node-cron";
import { reportDayCreate } from "@/services/cronjobs/reportcreatedayjobs.js";
// em sp 23:59 em producao 2:59
export function starReportDayJob() {
  cron.schedule("59 23 * * *", async () => {
    await reportDayCreate();
    console.log("Executando tarefa diária à 9:15 teste");
  });
}

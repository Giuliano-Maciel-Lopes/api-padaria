import { app } from "@/app.js";
import {starReportDayJob} from "./cronJobs/reportday.js";
import { env } from "./utils/env.js";
starReportDayJob()

const PORT: number = env.PORT ?? 3333
const HOST = "0.0.0.0";

app.listen(PORT, HOST ,  () => {
  console.log(`Servidor rodando na porta ${PORT}...`);
});
console.log("Hora local do servidor:", new Date().toString());
console.log("Hora UTC do servidor:", new Date().toISOString());

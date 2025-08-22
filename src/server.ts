import { app } from "@/app.js";
import {starReportDayJob} from "./cronJobs/reportday.js";
import { env } from "./utils/env.js";
starReportDayJob()

const PORT = env.PORT;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}...`);
});
console.log("Hora local do servidor:", new Date().toString());
console.log("Hora UTC do servidor:", new Date().toISOString());

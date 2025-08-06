// src/utils/dayjs.ts
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";
import localeData from "dayjs/plugin/localeData.js";

dayjs.extend(localeData);

dayjs.extend(utc);
dayjs.extend(timezone);

export { dayjs };

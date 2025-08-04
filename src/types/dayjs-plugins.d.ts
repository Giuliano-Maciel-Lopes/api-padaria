import "dayjs";

declare module "dayjs" {
  interface Dayjs {
    tz(timezone: string): Dayjs;
  }
}

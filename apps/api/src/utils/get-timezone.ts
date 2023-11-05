import { Dayjs } from "@ttbs/lib/dayjs";

export const getTimeZone = (date: Dayjs): string => (date as any)["$x"]["$timezone"];

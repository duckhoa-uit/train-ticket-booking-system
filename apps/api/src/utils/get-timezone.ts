import { Dayjs } from "@ttbs/lib/dayjs";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getTimeZone = (date: Dayjs): string => (date as any)["$x"]["$timezone"];

import { Dayjs } from './dayjs';

export const getTimeZone = (date: Dayjs): string => (date as any)['$x']['$timezone'];

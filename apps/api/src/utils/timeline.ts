import dayjs from "@ttbs/lib/dayjs";

type TimeViewType = "week" | "month" | "year" | "day";

export const getTimeLine = async (
  timeView: TimeViewType,
  startDate: dayjs.Dayjs,
  endDate: dayjs.Dayjs,
) => {
  let resultTimeLine: string[] = [];

  if (timeView) {
    switch (timeView) {
      case "day":
        resultTimeLine = getDailyTimeline(startDate, endDate);
        break;
      case "week":
        resultTimeLine = getWeekTimeline(startDate, endDate);
        break;
      case "month":
        resultTimeLine = getMonthTimeline(startDate, endDate);
        break;
      case "year":
        resultTimeLine = getYearTimeline(startDate, endDate);
        break;
      default:
        resultTimeLine = getWeekTimeline(startDate, endDate);
        break;
    }
  }

  return resultTimeLine;
};

function getDailyTimeline(
  startDate: dayjs.Dayjs,
  endDate: dayjs.Dayjs,
): string[] {
  const now = dayjs();
  const endOfDay = now.endOf("day");
  let pivotDate = dayjs(startDate);
  const dates: string[] = [];
  while (
    (pivotDate.isBefore(endDate) || pivotDate.isSame(endDate)) &&
    pivotDate.isBefore(endOfDay)
  ) {
    dates.push(pivotDate.format("YYYY-MM-DD"));
    pivotDate = pivotDate.add(1, "day");
  }
  return dates;
}

function getWeekTimeline(
  startDate: dayjs.Dayjs,
  endDate: dayjs.Dayjs,
): string[] {
  const now = dayjs();
  const endOfDay = now.endOf("day");
  let pivotDate = dayjs(startDate);
  const dates: string[] = [];

  while (pivotDate.isBefore(endDate) || pivotDate.isSame(endDate)) {
    const pivotAdded = pivotDate.add(6, "day");
    const weekEndDate = pivotAdded.isBefore(endOfDay) ? pivotAdded : endOfDay;
    dates.push(pivotDate.format("YYYY-MM-DD"));

    if (pivotDate.isSame(endDate)) {
      break;
    }

    pivotDate = weekEndDate.add(1, "day");
  }

  return dates;
}

function getMonthTimeline(startDate: dayjs.Dayjs, endDate: dayjs.Dayjs) {
  let pivotDate = dayjs(startDate);
  const dates = [];
  while (pivotDate.isBefore(endDate)) {
    pivotDate = pivotDate.set("month", pivotDate.get("month") + 1);

    dates.push(pivotDate.format("YYYY-MM-DD"));
  }
  return dates;
}

function getYearTimeline(startDate: dayjs.Dayjs, endDate: dayjs.Dayjs) {
  const pivotDate = dayjs(startDate);
  const dates = [];
  while (pivotDate.isBefore(endDate)) {
    pivotDate.set("year", pivotDate.get("year") + 1);
    dates.push(pivotDate.format("YYYY-MM-DD"));
  }
  return dates;
}

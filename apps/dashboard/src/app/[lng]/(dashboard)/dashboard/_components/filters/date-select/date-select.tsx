"use client";

import { DateRangePicker } from "@tremor/react";

import { useClientTranslation } from "@ttbs/i18n";
import dayjs from "@ttbs/lib/dayjs";

import { useFilterContext } from "../../../provider";

// import "./DateSelect.css";

export const DateSelect = () => {
  const { t } = useClientTranslation();
  const { filter, setConfigFilters } = useFilterContext();
  const currentDate = dayjs();
  const [startDate, endDate, range] = filter?.dateRange || [null, null, null];
  const startValue = startDate?.toDate() || null;
  const endValue = endDate?.toDate() || null;
  return (
    <div className="w-full max-w-96 sm:w-auto">
      <DateRangePicker
        value={{
          from: startValue,
          to: endValue,
          selectValue: range ?? undefined,
        }}
        defaultValue={{
          from: startValue,
          to: endValue,
          selectValue: range ?? undefined,
        }}
        onValueChange={(dateRangeValue) => {
          // const [selected, ...rest] = dateRangeValue;
          // const [start, end, range] = dateRangeValue;
          const { from: start, to: end, selectValue: range } = dateRangeValue;
          const { from: selected } = dateRangeValue;
          // If range has value and it's of type RangeType

          if (
            range &&
            (range === "tdy" ||
              range === "w" ||
              range === "t" ||
              range === "m" ||
              range === "y")
          ) {
            setConfigFilters({
              dateRange: [
                dayjs(start).startOf("d"),
                dayjs(end).endOf("d"),
                range,
              ],
            });

            return;
          } else if (start && !end) {
            // If only start time has value that means selected date should push to dateRange with last value null
            const currentDates = filter.dateRange;
            if (currentDates && currentDates.length > 0) {
              // remove last position of array
              currentDates.pop();
              // push new value to array
              currentDates.push(dayjs(selected));
              // if lenght > 2 then remove first value
              if (currentDates.length > 2) {
                currentDates.shift();
              }
              setConfigFilters({
                dateRange: [currentDates[0], currentDates[1], null],
              });
            }

            return;
          }

          // If range has value and it's of type RangeType
        }}
        enableSelect
        enableYearNavigation
        placeholder={t("select_date_range")}
        minDate={currentDate.subtract(2, "year").toDate()}
        maxDate={currentDate.toDate()}
        color="gray"
      />
    </div>
  );
};

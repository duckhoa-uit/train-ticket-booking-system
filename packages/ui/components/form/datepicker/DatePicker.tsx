import "react-calendar/dist/Calendar.css";
// import PrimitiveDatePicker from 'react-date-picker/dist/entry.nostyle';
import PrimitiveDatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";

import { cn } from "@ttbs/lib/cn";

import { Calendar } from "../../icons";

type Props = {
  date: Date;
  onDatesChange?: ((date: Value) => void) | undefined;
  className?: string;
  disabled?: boolean;
  minDate?: Date;
};

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const DatePicker = ({ minDate, disabled, date, onDatesChange, className }: Props) => {
  return (
    <PrimitiveDatePicker
      className={cn(
        "focus:ring-primary-500 focus:border-primary-500 border-default rounded-md border p-1 pl-2 shadow-sm sm:text-sm",
        className
      )}
      calendarClassName="rounded-md dark:text-black"
      clearIcon={null}
      calendarIcon={<Calendar className="text-subtle h-5 w-5 rounded-md" />}
      value={date}
      minDate={minDate}
      disabled={disabled}
      onChange={onDatesChange}
    />
  );
};

export default DatePicker;

import "react-calendar/dist/Calendar.css";
// import PrimitiveDatePicker from 'react-date-picker/dist/entry.nostyle';
import PrimitiveDatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";

import { cn } from "@ttbs/lib/cn";

import { Calendar } from "../../icons";
import "./DatePicker.css";

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
      className={cn("focus:ring-primary-500 h-9 sm:text-sm", className)}
      calendarClassName="border rounded-md dark:text-black bg-primary border-default hover:border-emphasis"
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

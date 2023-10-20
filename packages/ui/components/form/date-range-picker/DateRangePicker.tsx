// @see: https://github.com/wojtekmaj/react-daterange-picker/issues/91
import '@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css';
import PrimitiveDateRangePicker from '@wojtekmaj/react-daterange-picker';
// import PrimitiveDateRangePicker from '@wojtekmaj/react-daterange-picker/dist/entry.nostyle';

import { ArrowRight, Calendar, ChevronLeft, ChevronRight } from '../../icons';
import './styles.css';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

type Props = {
  disabled?: boolean | undefined;
  startDate: Date;
  endDate: Date;
  onDatesChange?: ((arg: { startDate: Value; endDate: Value }) => void) | undefined;
};

const DateRangePicker = ({ disabled, startDate, endDate, onDatesChange }: Props) => {
  return (
    <>
      <PrimitiveDateRangePicker
        disabled={disabled || false}
        className="border-default rounded-sm text-sm"
        clearIcon={null}
        calendarIcon={<Calendar className="text-subtle h-4 w-4" />}
        rangeDivider={<ArrowRight className="text-muted h-4 w-4 ltr:mr-2 rtl:ml-2" />}
        value={[startDate, endDate]}
        onChange={(value: Value) => {
          if (typeof onDatesChange === 'function') {
            if (Array.isArray(value)) {
              const [start, end] = value;
              onDatesChange({ startDate: start, endDate: end });
            }
          }
        }}
        nextLabel={<ChevronRight className="text-subtle h-4 w-4" />}
        prevLabel={<ChevronLeft className="text-subtle h-4 w-4" />}
      />
    </>
  );
};

export default DateRangePicker;

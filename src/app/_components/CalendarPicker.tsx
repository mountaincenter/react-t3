import React, { useState, forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { CalendarDaysIcon } from "@heroicons/react/24/outline";

import { registerLocale, setDefaultLocale } from "react-datepicker";
import ja from "date-fns/locale/ja";

registerLocale("ja", ja);
setDefaultLocale("ja");

interface CalendarPickerProps {
  onDayChange: (date: Date) => void;
  measurementDates?: Date[];
}

const CustomInput = forwardRef<
  HTMLButtonElement,
  { value?: string; onClick?: () => void }
>(({ onClick }, ref) => (
  <button onClick={onClick} ref={ref}>
    <CalendarDaysIcon className="h-5 w-5" />
  </button>
));

const CalendarPicker: React.FC<CalendarPickerProps> = ({
  onDayChange,
  measurementDates,
}) => {
  const [startDate, setStartDate] = useState(new Date());

  const handleChange = (date: Date) => {
    setStartDate(date);
    onDayChange(date);
  };

  return (
    <DatePicker
      selected={startDate}
      onChange={handleChange}
      // dateFormat="yyyy/MM/dd"
      showTimeSelect={false}
      locale="ja"
      customInput={<CustomInput />}
      highlightDates={measurementDates}
    />
  );
};

export default CalendarPicker;

"use client";

import React, { useState } from "react";
import { addMonths, subMonths, format } from "date-fns";

interface DateSelectorProps {
  onDateChange: (date: Date) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({ onDateChange }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handlePreviouMonth = () => {
    const newDate = subMonths(selectedDate, 1);
    setSelectedDate(newDate);
    onDateChange(newDate);
  };

  const handleNextMonth = () => {
    const newDate = addMonths(selectedDate, 1);
    setSelectedDate(newDate);
    onDateChange(newDate);
  };

  return (
    <div className="mb-4 flex justify-center">
      <button
        onClick={handlePreviouMonth}
        className="px-2 text-sm text-gray-500"
      >
        {"<"}
      </button>
      <div className="mx-4">
        <span className="text-sm text-gray-500">
          {format(selectedDate, "yyyy年MM月")}
        </span>
      </div>
      <button onClick={handleNextMonth} className="px-2 text-sm text-gray-500">
        {">"}
      </button>
    </div>
  );
};
export default DateSelector;

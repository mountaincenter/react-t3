"use client";

import React from "react";
import CalendarPicker from "./CalendarPicker";
import {
  addDays,
  subDays,
  format,
  isSameDay,
  isBefore,
  isAfter,
} from "date-fns";

interface DaySelectorProps {
  onDayChange: (date: Date) => void;
  selectedDay: Date;
  measurementDates?: Date[];
}

const DaySelector: React.FC<DaySelectorProps> = ({
  onDayChange,
  selectedDay,
  measurementDates,
}) => {
  const isLastMeasurementDay =
    measurementDates &&
    measurementDates.some(
      (date) => isSameDay(date, selectedDay) || isAfter(date, selectedDay),
    );

  const isOldestMeasurementDay =
    measurementDates &&
    measurementDates.some(
      (date) => isSameDay(date, selectedDay) || isBefore(date, selectedDay),
    );

  const handlePreviouDay = () => {
    const newDate = subDays(selectedDay, 1);
    onDayChange(newDate);
  };

  const handleNextDay = () => {
    const newDate = addDays(selectedDay, 1);
    onDayChange(newDate);
  };

  const handleToday = () => {
    const newDate = new Date();
    onDayChange(newDate);
  };

  // console.log(measurementDates);
  // console.log("isLastMeasurementDay", isLastMeasurementDay);
  // console.log("isOldestMeasurementDay", isOldestMeasurementDay);
  console.log("selectedDay", selectedDay);

  return (
    <div className="mb-4 flex justify-center">
      <button onClick={handlePreviouDay} className="px-2 text-sm text-gray-500">
        {"<"}
      </button>
      <div className="mx-4">
        <span className="text-sm text-gray-500">
          {format(selectedDay, "yyyy年MM月dd日")}
        </span>
      </div>
      <button onClick={handleNextDay} className="px-2 text-sm text-gray-500">
        {">"}
      </button>
      <button onClick={handleToday} className="px-2 text-sm text-gray-500">
        {"最新"}
      </button>

      <CalendarPicker onDayChange={onDayChange} />
    </div>
  );
};

export default DaySelector;

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
  const OldestDay: Date | undefined =
    measurementDates && measurementDates.length > 0
      ? measurementDates.slice(-1)[0]
      : undefined;

  const canSelectPreviousDay =
    OldestDay &&
    isAfter(selectedDay, OldestDay) &&
    !isSameDay(selectedDay, OldestDay);

  const LatestDay: Date =
    measurementDates && measurementDates.length > 0 && measurementDates?.[0]
      ? measurementDates[0]
      : new Date();

  const canSelectNextDay =
    isBefore(selectedDay, LatestDay) && !isSameDay(selectedDay, LatestDay);

  const handlePreviouDay = () => {
    if (
      measurementDates &&
      measurementDates.length > 0 &&
      measurementDates[0]
    ) {
      if (canSelectPreviousDay) {
        const currentIndex: number = measurementDates.findIndex((date) =>
          isSameDay(date, selectedDay),
        );
        console.log("currentIndex", currentIndex);
        if (currentIndex > 0 || currentIndex === 0) {
          const newDate = measurementDates[currentIndex + 1];
          if (newDate) {
            onDayChange(newDate);
          }
        }
      }
    }

    if (!canSelectPreviousDay) {
      const newDate = subDays(selectedDay, 1);
      onDayChange(newDate);
    }
  };

  const handleNextDay = () => {
    if (canSelectNextDay) {
      if (
        measurementDates &&
        measurementDates.length > 0 &&
        measurementDates[0]
      ) {
        const currentIndex: number = measurementDates.findIndex((date) =>
          isSameDay(date, selectedDay),
        );
        if (currentIndex > 0) {
          const newDate = measurementDates[currentIndex - 1];
          if (newDate) {
            onDayChange(newDate);
          }
        }
      } else {
        const newDate = addDays(selectedDay, 1);
        onDayChange(newDate);
      }
    }
  };
  const handleToday = () => {
    const newDate = new Date();
    onDayChange(newDate);
  };

  return (
    <div className="mb-4 flex justify-center">
      <button onClick={handlePreviouDay} className="px-2 text-sm text-gray-500">
        {canSelectPreviousDay !== false ? (
          "<"
        ) : (
          <span style={{ opacity: 0 }}>{"<"}</span>
        )}
      </button>
      <div className="mx-4">
        <span className="text-sm text-gray-500">
          {format(selectedDay, "yyyy年MM月dd日")}
        </span>
      </div>
      <button onClick={handleNextDay} className="px-2 text-sm text-gray-500">
        {canSelectNextDay ? ">" : <span style={{ opacity: 0 }}>{">"}</span>}
      </button>
      <button onClick={handleToday} className="px-2 text-sm text-gray-500">
        {"最新"}
      </button>
      <CalendarPicker
        onDayChange={onDayChange}
        measurementDates={measurementDates}
      />
    </div>
  );
};

export default DaySelector;

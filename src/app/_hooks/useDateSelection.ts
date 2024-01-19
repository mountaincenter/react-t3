"use client";

import { useState, useEffect } from "react";
import {
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  format,
  isSameDay,
} from "date-fns";

const useDateSelection = (initialDates?: Date[]) => {
  const [selectedMonth, setselectedMonth] = useState(new Date());
  const [selectedDay, setselectedDay] = useState(
    initialDates?.[0] ?? new Date(),
  );
  const [daysInMonth, setDaysInMonth] = useState<Date[]>([]);

  useEffect(() => {
    const start = startOfMonth(selectedMonth);
    const end = endOfMonth(selectedMonth);
    setDaysInMonth(eachDayOfInterval({ start, end }));
  }, [selectedMonth]);

  useEffect(() => {
    if (
      initialDates &&
      initialDates.length > 0 &&
      initialDates[0] &&
      !initialDates.some((date) => isSameDay(date, selectedDay))
    ) {
      setselectedDay(initialDates[0]);
    }
  }, [initialDates, selectedDay]);

  const handleMonthChange = (newDate: Date) => {
    setselectedMonth(newDate);
  };

  const handleDayChange = (newDate: Date) => {
    setselectedDay(newDate);
  };

  const labels = daysInMonth.map((date) => format(date, "d"));

  return {
    selectedYear: selectedMonth.getFullYear(),
    selectedMonth: selectedMonth.getMonth() + 1,
    selectedDay,
    handleMonthChange,
    handleDayChange,
    labels,
    daysInMonth,
  };
};

export default useDateSelection;

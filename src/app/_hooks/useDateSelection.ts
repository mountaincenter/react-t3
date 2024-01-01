"use client";

import { useState, useEffect } from "react";
import { eachDayOfInterval, startOfMonth, endOfMonth, format } from "date-fns";

const useDateSelection = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [daysInMonth, setDaysInMonth] = useState<Date[]>([]);

  useEffect(() => {
    const start = startOfMonth(selectedDate);
    const end = endOfMonth(selectedDate);
    setDaysInMonth(eachDayOfInterval({ start, end }));
  }, [selectedDate]);

  const handleDateChange = (newDate: Date) => {
    setSelectedDate(newDate);
  };

  const labels = daysInMonth.map((date) => format(date, "d"));

  return {
    selectedYear: selectedDate.getFullYear(),
    selectedMonth: selectedDate.getMonth() + 1,
    handleDateChange,
    labels,
    daysInMonth,
  };
};

export default useDateSelection;

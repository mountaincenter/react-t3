import React, { useState } from "react";

interface DateSelectorProps {
  onDateChange: (year: number, month: number) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({ onDateChange }) => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = parseInt(e.target.value);
    setSelectedYear(newYear);
    onDateChange(newYear, selectedMonth);
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = parseInt(e.target.value);
    setSelectedMonth(newMonth);
    onDateChange(selectedYear, newMonth);
  };

  return (
    <div className="mb-4 flex space-x-4">
      <div className="flex items-center rounded-lg border border-gray-300 px-4 py-2 ">
        <select
          value={selectedYear}
          onChange={handleYearChange}
          className="bg-transparent focus:bg-transparent focus:outline-none"
        >
          {Array.from({ length: 2 }, (_, i) => i + currentYear - 1).map(
            (year) => (
              <option key={year} value={year}>
                {year}年
              </option>
            ),
          )}
        </select>
      </div>
      <div className="flex items-center rounded-lg border border-gray-300 px-4 py-2">
        <select
          value={selectedMonth}
          onChange={handleMonthChange}
          className="focus:outline-none"
        >
          {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
            <option key={month} value={month}>
              {month}月
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
export default DateSelector;

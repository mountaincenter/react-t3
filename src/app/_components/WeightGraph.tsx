"use client";

import React, { useState } from "react";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { type Weight } from "@/app/types";
import { eachDayOfInterval, startOfMonth, endOfMonth, format } from "date-fns";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
);

interface WeightGraphProps {
  weights: Weight[];
  targetWeight?: number | null;
}

const WeightGraph = ({ weights, targetWeight }: WeightGraphProps) => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(parseInt(e.target.value));
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(parseInt(e.target.value));
  };

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(new Date(selectedYear, selectedMonth - 1, 1)),
    end: endOfMonth(new Date(selectedYear, selectedMonth - 1, 1)),
  });

  // const daysInDecember = eachDayOfInterval({
  //   start: startOfMonth(new Date(2023, 11, 1)),
  //   end: endOfMonth(new Date(2023, 11, 31)),
  // });

  const labels = daysInMonth.map((date) => format(date, "d"));
  const weightData = daysInMonth.map((date) => {
    const day = format(date, "yyyy-MM-dd");
    const weightRecord = weights.find(
      (w) => format(w.measurementDate, "yyyy-MM-dd") === day,
    );
    return weightRecord ? weightRecord.weight : null;
  });

  const weightValues = weights.map((w) => w.weight).filter((w) => w !== null);

  // targetWeightがnullまたはundefinedでなければ追加
  const allWeightData =
    targetWeight != null ? [...weightValues, targetWeight] : weightValues;

  const maxWeight =
    allWeightData.length > 0 ? Math.max(...allWeightData) + 5 : 0;
  const minWeight =
    allWeightData.length > 0 ? Math.min(...allWeightData) - 5 : 0;

  const generateChartData = {
    labels,
    datasets: [
      {
        label: "体重",
        type: "bar" as const,
        data: weightData,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "目標体重",
        type: "line" as const,
        data: Array.from({ length: daysInMonth.length }).fill(targetWeight),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: false,
        min: minWeight,
        max: maxWeight,
      },
    },
  };

  if (!weights || weights.length === 0) return null;

  return (
    <>
      <div className="mb-4 flex space-x-4">
        <div className="flex items-center rounded-lg border border-gray-300 px-4 py-2 ">
          <select
            value={selectedYear}
            onChange={handleYearChange}
            className="focus:outline-none"
          >
            {Array.from({ length: 2 }, (_, i) => i + currentYear).map(
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
      <Chart type="bar" data={generateChartData} options={options} />
    </>
  );
};

export default WeightGraph;

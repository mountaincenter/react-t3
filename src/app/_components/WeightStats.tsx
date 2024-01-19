"use client";

import React from "react";
import DaySelector from "./DaySelector";
import useDateSelection from "../_hooks/useDateSelection";

import type { Weight } from "@/app/types";

import { isSameDay } from "date-fns";

interface WeightStatsProps {
  weights?: Weight[];
  height: number;
}

const WeightStats: React.FC<WeightStatsProps> = ({ weights, height }) => {
  const measurementDates = weights?.map((weight) => weight.measurementDate);
  const { selectedDay, handleDayChange } = useDateSelection(measurementDates);
  // const { selectedDay, handleDayChange } = useDateSelection();
  const selectedWeight = weights?.find((weight) =>
    isSameDay(weight.measurementDate, selectedDay),
  );

  if (!selectedWeight) return null;

  const bmi = ((selectedWeight.weight / height / height) * 10000).toFixed(2);
  return (
    <>
      <DaySelector
        onDayChange={handleDayChange}
        selectedDay={selectedDay}
        measurementDates={measurementDates}
      />
      <div className="flex items-center justify-between p-4">
        <div className="mr-2 flex flex-col items-center">
          <div className="text-sm text-gray-500">体脂肪率</div>
          <div className="text-lg font-semibold">{selectedWeight.bodyFat}%</div>
        </div>
        <div className="mx-2 flex flex-col items-center">
          <div className="text-3xl font-bold text-blue-600">
            {selectedWeight.weight} kg
          </div>
          <div className="text-sm text-gray-500">体重</div>
        </div>
        <div className="ml-2 flex flex-col items-center">
          <div className="text-sm text-gray-500">BMI</div>
          <div className="text-lg font-semibold">{bmi}</div>
        </div>
      </div>
    </>
  );
};

export default WeightStats;

"use client";

import React from "react";
import WeightTable from "./WeightTable";
import DateSelector from "./DateSelector";
import useDateSelection from "@/app/_hooks/useDateSelection";
import { type Weight } from "@/app/types";

interface WeightDashbordProps {
  weights: Weight[];
}

const WeightDashbord: React.FC<WeightDashbordProps> = ({ weights }) => {
  const { handleDateChange, labels, daysInMonth } = useDateSelection();
  return (
    <div>
      <DateSelector onDateChange={handleDateChange} />
      <WeightTable
        weights={weights}
        labels={labels}
        daysInMonth={daysInMonth}
      />
    </div>
  );
};

export default WeightDashbord;

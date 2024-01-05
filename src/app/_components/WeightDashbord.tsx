"use client";

import React from "react";
import WeightTable from "./WeightTable";
import DateSelector from "./DateSelector";
import useDateSelection from "@/app/_hooks/useDateSelection";
import type { Weight, User } from "@/app/types";

interface WeightDashbordProps {
  weights: Weight[];
  user: User;
}

const WeightDashbord: React.FC<WeightDashbordProps> = ({ weights, user }) => {
  const { handleDateChange, labels, daysInMonth } = useDateSelection();
  return (
    <div>
      <DateSelector onDateChange={handleDateChange} />
      <WeightTable
        weights={weights}
        labels={labels}
        daysInMonth={daysInMonth}
        user={user}
      />
    </div>
  );
};

export default WeightDashbord;

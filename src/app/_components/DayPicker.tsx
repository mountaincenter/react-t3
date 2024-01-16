"use client";

import React from "react";
import DaySelector from "./DaySelector";
import useDateSelection from "../_hooks/useDateSelection";
import SelectedDay from "./SelectedDay";

import type { Weight } from "@/app/types";

interface DayPickerProps {
  weights?: Weight[];
}

const DayPicker: React.FC<DayPickerProps> = ({ weights }) => {
  const measurementDates = weights?.map((weight) => weight.measurementDate);
  const { selectedDay, handleDayChange } = useDateSelection(measurementDates);
  // const { selectedDay, handleDayChange } = useDateSelection();

  return (
    <>
      <DaySelector
        onDayChange={handleDayChange}
        selectedDay={selectedDay}
        measurementDates={measurementDates}
      />
      <div>
        <span className="text-sm">
          <SelectedDay selectedDay={selectedDay} />
        </span>
      </div>
    </>
  );
};

export default DayPicker;

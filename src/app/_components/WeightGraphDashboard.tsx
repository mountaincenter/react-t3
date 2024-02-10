import React, { useState } from "react";
import ChartsComponents from "./ChartsComponents";
import MonthSelector from "./MonthSelector";
import FullscreenDialog from "./FullscreenDialog";
import useDateSelection from "../_hooks/useDateSelection";
import type { Weight, User } from "@/app/types";

interface WeightGraphDashboardProps {
  weights: Weight[];
  user: User;
}

const WeightGraphDashboard: React.FC<WeightGraphDashboardProps> = ({
  weights,
  user,
}) => {
  const { handleMonthChange, daysInMonth, labels } = useDateSelection();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleGraphClick = () => {
    setIsDialogOpen(true);
  };

  return (
    <>
      <MonthSelector onDateChange={handleMonthChange} />
      <div onClick={handleGraphClick}>
        <ChartsComponents
          daysInMonth={daysInMonth}
          weights={weights}
          user={user}
          labels={labels}
        />
      </div>
      <FullscreenDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      >
        <MonthSelector onDateChange={handleMonthChange} />
        <div onClick={handleGraphClick} className="h-full w-full">
          <ChartsComponents
            daysInMonth={daysInMonth}
            weights={weights}
            user={user}
            labels={labels}
          />
        </div>
      </FullscreenDialog>
    </>
  );
};

export default WeightGraphDashboard;

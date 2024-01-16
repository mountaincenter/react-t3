import React from "react";
import { format } from "date-fns";

interface SelectedDayProps {
  selectedDay: Date;
}

const SelectedDay: React.FC<SelectedDayProps> = ({ selectedDay }) => {
  return (
    <div>
      <span className="text-sm">
        選択された日:{format(selectedDay, "yyyy年MM月dd日")}
      </span>
    </div>
  );
};

export default SelectedDay;

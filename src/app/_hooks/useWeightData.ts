import { type Weight } from "@/app/types";
import { format } from "date-fns";

const useWeightData = (weights: Weight[], daysInMonth: Date[]) => {
  const weightData = daysInMonth.map((date) => {
    const day = format(date, "yyyy-MM-dd");
    const weightRecord = weights.find(
      (w) => format(w.measurementDate, "yyyy-MM-dd") === day,
    );
    return weightRecord ? weightRecord.weight : null;
  });

  const weightValues = weights.map((w) => w.weight).filter((w) => w !== null);

  const bodyFatData = daysInMonth.map((date) => {
    const day = format(date, "yyyy-MM-dd");
    const weightRecord = weights.find(
      (w) => format(w.measurementDate, "yyyy-MM-dd") === day,
    );
    return weightRecord ? weightRecord.bodyFat : null;
  });

  return {
    weightData,
    bodyFatData,
    weightValues,
  };
};

export default useWeightData;
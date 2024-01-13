import { type Weight } from "@/app/types";
import { format } from "date-fns";

const useWeightData = (weights: Weight[], daysInMonth: Date[]) => {
  const weightData = daysInMonth.map((date) => {
    const day = format(date, "yyyy-MM-dd");
    const weightRecord = weights.find(
      (w) => format(w.measurementDate, "yyyy-MM-dd") === day,
    );
    return weightRecord?.weight ?? null;
  });

  const weightDatum = daysInMonth.map((date) => {
    const day = format(date, "yyyy-MM-dd");
    const weightRecord = weights.find(
      (w) => format(w.measurementDate, "yyyy-MM-dd") === day,
    );
    return weightRecord ?? null;
  });

  const monthWeightValues = weightDatum
    .map((weightData) => (weightData ? weightData.weight : null))
    .filter((weight): weight is number => weight != null);

  const maxWeightThisMonth =
    monthWeightValues.length > 0 ? Math.max(...monthWeightValues) : null;
  const minWeightThisMonth =
    monthWeightValues.length > 0 ? Math.min(...monthWeightValues) : null;

  const weightValues = weights.map((w) => w.weight).filter((w) => w !== null);

  const bodyFatData = daysInMonth.map((date) => {
    const day = format(date, "yyyy-MM-dd");
    const weightRecord = weights.find(
      (w) => format(w.measurementDate, "yyyy-MM-dd") === day,
    );
    return weightRecord?.bodyFat ?? null;
  });

  const bodyFatValues = weights.map((w) => w.bodyFat).filter((w) => w != null);

  const getMovingAverage = (day: string, numDays: number): number | null => {
    const endDate = new Date(day);
    const startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - (numDays - 1));

    const relevantWeights = weights.filter((weight) => {
      const weightDate = new Date(weight.measurementDate);
      return weightDate >= startDate && weightDate <= endDate;
    });

    const totalWeight = relevantWeights.reduce(
      (sum, weight) => sum + (weight.weight ?? 0),
      0,
    );

    const beforeToday =
      weights[0] &&
      (endDate.getTime() < weights[0].measurementDate.getTime() ||
        endDate.getTime() === weights[0].measurementDate.getTime());

    console.log("endDate", endDate, "beforeToday", beforeToday);

    return relevantWeights.length > 0 && beforeToday
      ? parseFloat((totalWeight / relevantWeights.length).toFixed(1))
      : null;
  };

  const movingAverages = daysInMonth.map((date) => {
    const day = format(date, "yyyy-MM-dd");
    return getMovingAverage(day, 7);
  });

  return {
    weightData,
    bodyFatData,
    weightValues,
    bodyFatValues,
    weightDatum,
    maxWeightThisMonth,
    minWeightThisMonth,
    movingAverages,
  };
};

export default useWeightData;

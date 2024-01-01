import React from "react";
import { type Weight } from "@/app/types";
import { format } from "date-fns";

interface WeightDiffProps {
  recentWeight: Weight;
  previousWeight: Weight;
}
const WeightDiff: React.FC<WeightDiffProps> = ({
  recentWeight,
  previousWeight,
}) => {
  const previousDate =
    previousWeight.measurementDate !== undefined
      ? format(previousWeight.measurementDate, "yyyy-MM-dd")
      : "-";

  const getDiffIndicator = (diff: number) => {
    if (diff > 0) {
      return { symbol: "▲", color: "text-red-500", message: "増加" };
    } else if (diff < 0) {
      return { symbol: "▼", color: "text-blue-500", message: "減少" };
    } else {
      return { symbol: "-", color: "text-gray-500", message: "横ばい" };
    }
  };

  const weightDiffValue = recentWeight.weight - previousWeight.weight;
  const weightDiff = Math.abs(weightDiffValue).toFixed(1);
  const {
    symbol: weightSymbol,
    color: weightColor,
    message: weightMessage,
  } = getDiffIndicator(weightDiffValue);

  const bodyFatDiffValue =
    recentWeight.bodyFat !== undefined && previousWeight.bodyFat !== undefined
      ? recentWeight.bodyFat - previousWeight.bodyFat
      : "-";

  let bodyFatSymbol, bodyFatColor, bodyFatMessage;

  if (bodyFatDiffValue !== "-") {
    const diffIndicator = getDiffIndicator(bodyFatDiffValue);
    bodyFatSymbol = diffIndicator.symbol;
    bodyFatColor = diffIndicator.color;
    bodyFatMessage = diffIndicator.message;
  } else {
    bodyFatSymbol = "";
    bodyFatColor = "text-gray-500";
    bodyFatMessage = "";
  }

  const bodyFatDiff =
    typeof bodyFatDiffValue === "number"
      ? Math.abs(bodyFatDiffValue).toFixed(2)
      : "-";

  console.log("bodyFatDiffValue", bodyFatDiffValue);

  return (
    <div className="rounded-lg bg-white p-4 ">
      <div className="mb-2 text-center text-lg ">前回との比較</div>
      <div className="mb-4 text-center text-sm text-gray-500">
        {previousDate}
      </div>
      <div className="flex items-center justify-around py-3">
        <div className="flex flex-col items-center text-center">
          <div className="flex flex-col items-center text-center">
            <div className="text-xl font-semibold">
              {weightDiff} kg{" "}
              <span className={`${weightColor} ml-2`}>{weightSymbol}</span>
            </div>
          </div>
          <div className="mt-1 text-sm text-gray-500">{weightMessage}</div>
        </div>
        <div className="flex flex-col items-center px-4 text-center">
          <div className="text-xl font-semibold">
            {bodyFatDiff}%{" "}
            <span className={`${bodyFatColor} ml-2`}>{bodyFatSymbol}</span>
          </div>
          <div className="mt-1 text-sm text-gray-500">{bodyFatMessage}</div>
        </div>
      </div>
    </div>
  );
};

export default WeightDiff;

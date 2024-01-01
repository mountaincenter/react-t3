import React from "react";
import { type Weight } from "@/app/types";
import useWeightData from "@/app/_hooks/useWeightData";

interface WeightTableProps {
  weights: Weight[];
  labels: string[];
  daysInMonth: Date[];
}

const WeightTable: React.FC<WeightTableProps> = ({
  weights,
  labels,
  daysInMonth,
}) => {
  const { weightData, bodyFatData } = useWeightData(weights, daysInMonth);

  console.log("labels", labels);
  console.log("weightData", weightData);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
            >
              Date
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
            >
              Weight kg
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
            >
              Body Fat %
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {/* Loop through each day of the month */}
          {daysInMonth.map((date, i) => (
            <tr key={i}>
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-500">
                {labels[i]} 日
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                {weightData[i] !== null ? weightData[i] : "-"}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                {bodyFatData[i] !== null ? bodyFatData[i] : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WeightTable;

import React from "react";
import type { Weight, User } from "@/app/types";
import useWeightData from "@/app/_hooks/useWeightData";
import WeightTableRow from "@/app/_components/WeightTableRow";

interface WeightTableProps {
  weights: Weight[];
  labels: string[];
  daysInMonth: Date[];
  user: User;
}

const WeightTable: React.FC<WeightTableProps> = ({
  weights,
  labels,
  daysInMonth,
  user,
}) => {
  const { weightDatum } = useWeightData(weights, daysInMonth);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500"
            >
              Date
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500"
            >
              Weight kg
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500"
            >
              Body Fat %
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {daysInMonth.map((date, i) => (
            <WeightTableRow
              key={i}
              label={labels[i] ?? "No Date"}
              weightDatum={weightDatum[i] ?? null}
              userId={user.id}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WeightTable;

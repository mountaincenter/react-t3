import React from "react";
import {
  CartesianGrid,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  type TooltipProps,
  Legend,
  ReferenceLine,
  ComposedChart,
  ResponsiveContainer,
} from "recharts";

import type { Weight, User } from "@/app/types";

import useWeightData from "../_hooks/useWeightData";

interface ChartsComponentsProps {
  daysInMonth: Date[];
  weights: Weight[];
  user: User;
  labels: string[];
}

const CustomTooltip: React.FC<TooltipProps<number, string>> = ({
  active,
  payload,
  label,
}) => {
  if (active && payload?.length) {
    return (
      <div
        className="custom-tooltip"
        style={{
          backgroundColor: "#fff",
          padding: "10px",
          border: "1px solid #ccc",
        }}
      >
        <p className="label">{`Day ${label} :`}</p>
        {payload.map((entry, index: number) => (
          <p
            key={`item-${index}`}
            style={{ color: entry.color }}
          >{`${entry.name}: ${entry.value}`}</p>
        ))}
      </div>
    );
  }

  return null;
};

const ChartsComponents: React.FC<ChartsComponentsProps> = ({
  daysInMonth,
  weights,
  user,
  labels,
}) => {
  const { weightData, movingAverages, bodyFatData } = useWeightData(
    weights,
    daysInMonth,
  );
  const data = labels.map((label, index) => ({
    day: label,
    weight: weightData[index],
    bodyFat: bodyFatData[index],
    movingAverage: movingAverages[index],
  }));

  return (
    <>
      <ResponsiveContainer width="100%" height="80%" aspect={1.5}>
        <ComposedChart
          data={data}
          margin={{ top: 8, right: 8, left: 8, bottom: 5 }}
        >
          <Bar
            dataKey="weight"
            fill="rgba(104, 134, 248, 0.6)"
            barSize={20}
            yAxisId="left"
          />
          <Line
            dataKey="movingAverage"
            stroke="rgba(248, 104,134, 0.6)"
            type="monotone"
            yAxisId="left"
          />
          <Line
            dataKey="bodyFat"
            type="monotone"
            stroke="#ff7300"
            strokeWidth={3}
            dot={{
              fill: "#ff7300",
              strokeWidth: 3,
            }}
            yAxisId="right"
          />
          <CartesianGrid strokeDasharray="3 3" />
          <Legend verticalAlign="top" height={36} />
          <Tooltip content={<CustomTooltip />} />
          <XAxis dataKey="day" />
          <YAxis
            yAxisId="left"
            orientation="left"
            stroke="#8884d8"
            type="number"
            domain={[
              user.targetWeight ? user.targetWeight - 3 : "dataMin - 3",
              "dataMax + 3",
            ]}
            label={{ value: "Weight (kg)", angle: -90, position: "insideLeft" }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="#82ca9d"
            type="number"
            domain={["dataMin - 10", "dataMax + 3"]}
            label={{
              value: "Body Fat (%)",
              angle: -90,
              position: "insideRight",
            }}
          />
          <ReferenceLine
            y={user.targetWeight}
            label="目標体重"
            stroke="red"
            strokeDasharray="3 3"
            yAxisId="left"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </>
  );
};

export default ChartsComponents;

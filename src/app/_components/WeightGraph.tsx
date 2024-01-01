"use client";

import React from "react";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { type Weight } from "@/app/types";
import DateSelector from "./DateSelector";
import useDateSelection from "../_hooks/useDateSelection";
import useWeightData from "../_hooks/useWeightData";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
);

interface WeightGraphProps {
  weights: Weight[];
  targetWeight?: number | null;
}

const WeightGraph = ({ weights, targetWeight }: WeightGraphProps) => {
  const { handleDateChange, labels, daysInMonth } = useDateSelection();
  const { weightData, weightValues } = useWeightData(weights, daysInMonth);

  const allWeightData =
    targetWeight != null ? [...weightValues, targetWeight] : weightValues;

  const maxWeight =
    allWeightData.length > 0 ? Math.max(...allWeightData) + 5 : 0;
  const minWeight =
    allWeightData.length > 0 ? Math.min(...allWeightData) - 5 : 0;

  const generateChartData = {
    labels,
    datasets: [
      {
        label: "体重",
        type: "bar" as const,
        data: weightData,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "目標体重",
        type: "line" as const,
        data: Array.from({ length: daysInMonth.length }).fill(targetWeight),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        pointRadius: 0,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: false,
        min: minWeight,
        max: maxWeight,
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 10,
          },
        },
      },
      x: {
        ticks: {
          maxRotation: 0,
          minRotation: 0,
          font: {
            size: 10,
          },
        },
        grid: {
          display: false,
        },
      },
    },
  };

  if (!weights || weights.length === 0) return null;

  return (
    <>
      <DateSelector onDateChange={handleDateChange} />
      <Chart type="bar" data={generateChartData} options={options} />
    </>
  );
};

export default WeightGraph;

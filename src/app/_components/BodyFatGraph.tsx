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
import zoomPlugin from "chartjs-plugin-zoom";
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
  zoomPlugin,
);

interface WeightGraphProps {
  weights: Weight[];
  onGraphClick?: () => void;
}

const BodyFatGraph = ({ weights, onGraphClick }: WeightGraphProps) => {
  const { handleDateChange, labels, daysInMonth } = useDateSelection();
  const { bodyFatData } = useWeightData(weights, daysInMonth);

  const generateChartData = {
    labels,
    datasets: [
      {
        label: "体脂肪率",
        type: "line" as const,
        data: bodyFatData,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: false,
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
      <div onClick={onGraphClick}>
        <Chart type="line" data={generateChartData} options={options} />
      </div>
    </>
  );
};

export default BodyFatGraph;

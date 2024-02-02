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
import DateSelector from "./MonthSelector";
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
  targetWeight?: number | null;
  onGraphClick?: () => void;
}

const WeightDataGraph = ({
  weights,
  targetWeight,
  onGraphClick,
}: WeightGraphProps) => {
  const { handleMonthChange, labels, daysInMonth } = useDateSelection();
  const { weightData, weightValues, movingAverages } = useWeightData(
    weights,
    daysInMonth,
  );

  const allWeightData =
    targetWeight != null ? [...weightValues, targetWeight] : weightValues;

  const maxWeight =
    allWeightData.length > 0 ? Math.max(...allWeightData) + 5 : 0;
  const minWeight =
    allWeightData.length > 0 ? Math.min(...allWeightData) - 5 : 0;

  const generateChartData = {
    labels: labels,
    datasets: [
      {
        label: "体重",
        type: "bar" as const,
        data: weightData,
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "移動平均",
        type: "line" as const,
        data: movingAverages,
        backgroundColor: "rgba(153, 102, 255, 0.5)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 2,
        fill: false,
        lineTension: 0.4,
      },
      {
        label: "目標体重",
        type: "line" as const,
        data: Array.from({ length: daysInMonth.length }).fill(targetWeight),
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderWidth: 2,
        borderDash: [5, 5],
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
          display: true,
          color: "rgba(200, 200, 200, 0.5)", // グリッドラインの色
        },
        ticks: {
          font: {
            size: 12,
            family: "Helvetica", // フォントファミリー
          },
          color: "#4B5563", // ティックの色
        },
      },
      x: {
        ticks: {
          maxRotation: 0,
          minRotation: 0,
          font: {
            size: 12,
            family: "Helvetica",
          },
          color: "#4B5563",
        },
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        position: "top" as const, // 凡例の位置
        labels: {
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: "rgba(0,0,0,0.7)", // ツールチップの背景色
        titleFont: {
          family: "Helvetica",
          size: 14,
        },
        bodyFont: {
          family: "Helvetica",
          size: 12,
        },
        cornerRadius: 4, // ツールチップの角の丸み
      },
    },
    animation: {
      duration: 1000,
      easing: "easeOutQuad" as const,
    },
  };

  if (!weights || weights.length === 0) return null;

  return (
    <>
      <DateSelector onDateChange={handleMonthChange} />
      <div onClick={onGraphClick}>
        <Chart type="bar" data={generateChartData} options={options} />
      </div>
    </>
  );
};

export default WeightDataGraph;

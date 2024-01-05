import React from "react";

interface WeightStatsProps {
  weight: number;
  bodyFat: number;
  height: number;
}

const WeightStats: React.FC<WeightStatsProps> = ({
  weight,
  bodyFat,
  height,
}) => {
  const bmi = ((weight / height / height) * 10000).toFixed(2);
  return (
    <div className="flex items-center justify-between p-4">
      <div className="mr-2 flex flex-col items-center">
        <div className="text-sm text-gray-500">体脂肪率</div>
        <div className="text-lg font-semibold">{bodyFat}%</div>
      </div>
      <div className="mx-2 flex flex-col items-center">
        <div className="text-3xl font-bold text-blue-600">{weight} kg</div>
        <div className="text-sm text-gray-500">体重</div>
      </div>
      <div className="ml-2 flex flex-col items-center">
        <div className="text-sm text-gray-500">BMI</div>
        <div className="text-lg font-semibold">{bmi}</div>
      </div>
    </div>
  );
};

export default WeightStats;

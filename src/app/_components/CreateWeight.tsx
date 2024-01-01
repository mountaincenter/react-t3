"use client";
import React, { type ChangeEvent } from "react";
import { useState } from "react";
import { useWeightMutation } from "../_hooks/useWeightMutation";
import CustomAlert from "./CustomAlert";
import { format } from "date-fns";
import { type Weight } from "@/app/types";

interface CreateWeightProps {
  userId: number;
  initialWeight?: Weight;
}

export function CreateWeight({ userId, initialWeight }: CreateWeightProps) {
  const [weight, setWeight] = useState(initialWeight?.weight ?? 0);
  const [bodyFat, setBodyFat] = useState(
    initialWeight?.bodyFat?.toString() ?? "",
  );
  const [isBodyFatDisabled, setIsBodyFatDisabled] = useState(false);
  const [measurementDate, setMeasurementDate] = useState(() =>
    format(new Date(), "yyyy-MM-dd"),
  );

  const handleBodyFatChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isBodyFatDisabled) {
      setBodyFat(e.target.value);
    }
  };

  const handleCreateWeightSuccess = () => {
    setWeight(0);
    setBodyFat("");
    setMeasurementDate(() => format(new Date(), "yyyy-MM-dd"));
  };

  const { createWeight, message } = useWeightMutation(
    handleCreateWeightSuccess,
  );

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createWeight.mutate(
            {
              weight,
              bodyFat: !isBodyFatDisabled ? parseFloat(bodyFat) || null : null,
              userId,
              measurementDate: new Date(measurementDate),
            },
            { onSuccess: handleCreateWeightSuccess },
          );
        }}
        className="mb-4 space-y-3"
      >
        <div className="flex space-x-4">
          <div className="flex items-center rounded-lg border border-gray-300 px-4 py-2 focus-within:border-blue-400">
            <input
              type="number"
              placeholder="体重"
              value={weight}
              onChange={(e) => setWeight(parseFloat(e.target.value))}
              className="w-full max-w-[calc(100%-1rem)] p-2 text-sm focus:outline-none"
              step="0.1"
            />
            <span className="ml-2 text-sm text-gray-500">kg</span>
          </div>

          {!isBodyFatDisabled && (
            <div className="flex items-center rounded-lg border border-gray-300 px-4 py-2 focus-within:border-blue-400">
              <input
                type="number"
                placeholder="体脂肪率"
                value={bodyFat}
                onChange={handleBodyFatChange}
                className="w-full max-w-[calc(100%-1rem)] p-2 text-sm focus:outline-none"
                step="0.01"
              />
              <span className="ml-2 text-sm text-gray-500">%</span>
            </div>
          )}

          <div className="flex items-center rounded-lg border border-gray-300 px-4 py-2 focus-within:border-blue-400">
            <input
              type="date"
              placeholder="計測日"
              value={measurementDate}
              onChange={(e) => setMeasurementDate(e.target.value)}
              className="w-full bg-transparent focus:bg-transparent focus:outline-none"
            />
          </div>
        </div>
        <div className="mt-4 flex items-center">
          <input
            type="checkbox"
            checked={isBodyFatDisabled}
            onChange={() => setIsBodyFatDisabled(!isBodyFatDisabled)}
            id="bodyFatCheckbox"
            className="hidden"
          />
          <label
            htmlFor="bodyFatCheckbox"
            className="flex cursor-pointer items-center text-sm text-gray-500"
          >
            <span
              className={`mr-2 inline-block h-5 w-5 rounded border border-gray-300 ${
                isBodyFatDisabled ? "bg-blue-500" : "bg-white"
              }`}
            ></span>
            体脂肪率を記録しない
          </label>
        </div>
        <button
          type="submit"
          className="w-full transform rounded bg-blue-500 px-4 py-2 text-white duration-200 hover:scale-95 hover:bg-blue-400"
          disabled={createWeight.isLoading}
        >
          {createWeight.isLoading ? "登録中..." : "登録"}
        </button>
      </form>
      {message && (
        <CustomAlert
          message={message}
          type={createWeight.isSuccess ? "success" : "error"}
        />
      )}
    </>
  );
}

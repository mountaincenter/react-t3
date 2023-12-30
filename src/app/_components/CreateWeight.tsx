"use client";
import React, { type ChangeEvent } from "react";
import { useState } from "react";
import { useWeightMutation } from "../_hooks/useWeightMutation";
import CustomAlert from "./CustomAlert";
import { format } from "date-fns";

interface CreateWeightProps {
  userId: number;
  initialWeight?: number;
  initialBodyFat?: string;
}

export function CreateWeight({
  userId,
  initialWeight = 0,
  initialBodyFat = "",
}: CreateWeightProps) {
  const [weight, setWeight] = useState(initialWeight);
  const [bodyFat, setBodyFat] = useState(initialBodyFat);
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
              className="w-full focus:outline-none"
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
                className="w-full focus:outline-none"
                step="0.1"
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
              className="w-full focus:outline-none"
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

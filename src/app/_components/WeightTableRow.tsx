"use client";
import React, { useState, useRef, useEffect } from "react";
import { useWeightMutation } from "../_hooks/useWeightMutation";
import CustomAlert from "./CustomAlert";
import type { Weight } from "@/app/types";
import useDateSelector from "@/app/_hooks/useDateSelection";

import {
  PencilSquareIcon,
  PencilIcon,
  TrashIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

interface WeightTableRowProps {
  label: string;
  weightDatum: Weight | null;
  userId: number;
  maxWeightThisMonth: number | null;
  minWeightThisMonth: number | null;
}

const WeightTableRow: React.FC<WeightTableRowProps> = ({
  label,
  weightDatum,
  userId,
  maxWeightThisMonth,
  minWeightThisMonth,
}) => {
  const { createWeight, updateWeight, deleteWeight, message } =
    useWeightMutation();
  const { selectedYear, selectedMonth } = useDateSelector();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editWeight, setEditWeight] = useState<number | null>(
    weightDatum?.weight ?? null,
  );
  const [editBodyFat, setEditBodyFat] = useState<number | null>(
    weightDatum?.bodyFat ?? null,
  );

  const handleEdit = async () => {
    setIsEditing(true);
  };

  const measurementDate = new Date(
    selectedYear,
    selectedMonth - 1,
    Number(label),
  );

  const handleSave = async () => {
    const safeWeight = editWeight ?? 0; // null の場合はデフォルトで 0
    const safeBodyFat = editBodyFat ?? 0; // null の場合はデフォルトで 0

    if (weightDatum) {
      updateWeight.mutate({
        id: weightDatum.id,
        data: {
          weight: safeWeight,
          bodyFat: safeBodyFat,
          measurementDate: weightDatum.measurementDate,
          userId: weightDatum.userId,
        },
      });
    } else {
      createWeight.mutate({
        weight: safeWeight,
        bodyFat: safeBodyFat,
        measurementDate: measurementDate,
        userId: userId,
      });
    }
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (weightDatum && weightDatum !== null) {
      deleteWeight.mutate({ id: weightDatum.id });
    }
  };
  const handleCancel = () => {
    setIsEditing(false);
  };

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const borderClass =
    weightDatum?.weight != null && weightDatum.weight === maxWeightThisMonth
      ? "border-l-4 border-red-500"
      : weightDatum?.weight != null && weightDatum.weight === minWeightThisMonth
        ? "border-l-4 border-blue-500"
        : "";

  console.log(
    "isMax",
    maxWeightThisMonth === weightDatum?.weight,
    "isMin",
    minWeightThisMonth === weightDatum?.weight,
  );

  return (
    <>
      <tr
        className={`whitespace-nowrap px-6 py-4 text-center text-sm ${borderClass}`}
      >
        <td className="whitespace-nowrap px-6 py-4 text-center text-sm font-medium text-gray-500">
          {label} 日
        </td>
        <td className={"whitespace-nowrap px-6 py-4 text-center text-sm"}>
          {isEditing ? (
            <input
              ref={inputRef}
              type="number"
              value={editWeight ?? 0}
              onChange={(e) => {
                setEditWeight(Number(e.target.value));
              }}
              className="mr-2 w-full rounded border border-gray-400 px-2 py-1"
            />
          ) : (
            <span className="text-gray-700">{weightDatum?.weight ?? "-"}</span>
          )}
        </td>
        <td className={"whitespace-nowrap px-2 py-4 text-center text-sm"}>
          {isEditing ? (
            <input
              ref={inputRef}
              type="number"
              value={editBodyFat ?? 0}
              onChange={(e) => {
                setEditBodyFat(Number(e.target.value));
              }}
              className="mr-2 w-full rounded border border-gray-400 px-2 py-1"
            />
          ) : (
            <span className="text-gray-700">{weightDatum?.bodyFat ?? "-"}</span>
          )}
        </td>
        <td>
          {isEditing ? (
            <CheckIcon
              className="mr-3 h-5 w-5 cursor-pointer text-blue-500"
              onClick={handleSave}
            />
          ) : weightDatum ? (
            <PencilSquareIcon
              className="mr-3 h-5 w-5 cursor-pointer text-gray-500"
              onClick={handleEdit}
            />
          ) : (
            <PencilIcon
              className="mr-3 h-5 w-5 cursor-pointer text-gray-500"
              onClick={handleEdit}
            />
          )}
        </td>
        <td>
          {isEditing ? (
            <XMarkIcon
              className="h-5 w-5 cursor-pointer text-gray-500"
              onClick={handleCancel}
            />
          ) : (
            weightDatum && (
              <TrashIcon
                className="h-5 w-5 cursor-pointer text-red-500"
                onClick={handleDelete}
              />
            )
          )}
        </td>
      </tr>
      {message && (
        <CustomAlert
          message={message}
          type={updateWeight.isSuccess ? "success" : "error"}
        />
      )}
    </>
  );
};

export default WeightTableRow;

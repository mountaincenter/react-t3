"use client";
import React, { useState, useRef, useEffect } from "react";
import { useWeightMutation } from "../_hooks/useWeightMutation";
import CustomAlert from "./CustomAlert";
import type { Weight } from "@/app/types";
import useDateSelector from "@/app/_hooks/useDateSelection";

interface WeightTableRowProps {
  label: string;
  weightDatum: Weight | null;
  userId: number;
}

const WeightTableRow: React.FC<WeightTableRowProps> = ({
  label,
  weightDatum,
  userId,
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

  // console.log("weightDatumRow", weightDatum);
  // console.log("userId", userId);
  // console.log("selectedYear", selectedYear);
  // console.log("selectedMonth", selectedMonth);

  const measurementDate = new Date(
    selectedYear,
    selectedMonth - 1,
    Number(label),
  );
  // console.log("measurementDate", measurementDate);

  const handleSave = async () => {
    // weight と bodyFat は null でなく提供されると仮定
    // null の場合はデフォルト値を使用
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
  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const handleDelete = async () => {
    if (weightDatum && weightDatum !== null) {
      deleteWeight.mutate({ id: weightDatum.id });
    }

    useEffect(() => {
      if (isEditing) {
        inputRef.current?.focus();
      }
    }, [isEditing]);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <>
      <tr>
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
            <button className="mr-3 text-blue-500" onClick={handleSave}>
              save
            </button>
          ) : weightDatum ? (
            <button className="mr-3 text-green-500" onClick={handleEdit}>
              edit
            </button>
          ) : (
            <button className="mr-3 text-blue-500" onClick={handleEdit}>
              create
            </button>
          )}
        </td>
        <td>
          {isEditing ? (
            <button className="text-gray-500" onClick={handleCancel}>
              cancel
            </button>
          ) : (
            weightDatum && (
              <button className="text-red-500" onClick={handleDelete}>
                delete
              </button>
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

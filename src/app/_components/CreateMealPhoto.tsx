"use client";
import { useState } from "react";
import { useMealPhotoMutation } from "../_hooks/useMealPhotoMutation";
import CustomAlert from "./CustomAlert";
import { format } from "date-fns";

interface CreateMealPhotoProps {
  userId: number;
}

const CreateMealPhoto = ({ userId }: CreateMealPhotoProps) => {
  const [url, setUrl] = useState("");
  const [registeredDate, setRegisteredDate] = useState(() =>
    format(new Date(), "yyyy-MM-dd"),
  );
  const [mealType, setMealType] = useState("");
  const [description, setDescription] = useState(null);
  const [mealCalories, setMealCalories] = useState<number | null>(null);
  const [rating, setRating] = useState(null);

  const handleCreateWeghtSuccess = () => {
    setUrl("");
    setRegisteredDate(() => format(new Date(), "yyyy-MM-dd"));
    setMealType("");
    setDescription(null);
    setMealCalories(null);
    setRating(null);
  };

  const { createMealPhoto, message } = useMealPhotoMutation(
    handleCreateWeghtSuccess,
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMealPhoto.mutate(
      {
        url,
        registeredDate: new Date(registeredDate),
        mealType,
        description,
        mealCalories: parseFloat(mealCalories) ?? null,
        rating,
        userId,
      },
      { onSuccess: handleCreateWeghtSuccess },
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="flex items-center rounded-lg border border-gray-300 px-3 py-2 focus-within:border-blue-400">
            <input
              type="text"
              placeholder="URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
            />
          </div>
          <div className="flex items-center rounded-lg border border-gray-300 px-3 py-2 focus-within:border-blue-400">
            <input
              type="date"
              placeholder="Registered Date"
              value={registeredDate}
              onChange={(e) => setRegisteredDate(e.target.value)}
              className="w-full rounded-lg border px-4 py-2 focus:border-blue-400 focus:outline-none"
            />
          </div>
          <div className="flex items-center rounded-lg border border-gray-300 px-3 py-2 focus-within:border-blue-400">
            <select
              value={mealType}
              onChange={(e) => setMealType(e.target.value)}
              className="w-full rounded-lg border px-4 py-2 focus:border-blue-400 focus:outline-none"
            >
              <option value="">Meal Type</option>
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="snack">Snack</option>
              <option value="dinner">Dinner</option>
            </select>
          </div>
          <div className="flex items-center rounded-lg border border-gray-300 px-3 py-2 focus-within:border-blue-400">
            <input
              type="text"
              placeholder="Description"
              value={description ?? ""}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-lg border px-4 py-2 focus:border-blue-400 focus:outline-none"
            />
          </div>
          <div className="flex items-center rounded-lg border border-gray-300 px-3 py-2 focus-within:border-blue-400">
            <input
              type="number"
              placeholder="Meal Calories"
              value={mealCalories ?? ""}
              onChange={(e) => setMealCalories(parseFloat(e.target.value))}
              className="w-full rounded-lg border px-4 py-2 focus:border-blue-400 focus:outline-none"
            />
          </div>
          <div className="flex items-center rounded-lg border border-gray-300 px-3 py-2 focus-within:border-blue-400">
            <select
              value={rating ?? ""}
              onChange={(e) => setRating(parseFloat(e.target.value))}
              className="w-full rounded-lg border px-4 py-2 focus:border-blue-400 focus:outline-none"
            >
              <option value="">Rating</option>
              <option value="1">1 Star</option>
              <option value="2">2 Star</option>
              <option value="3">3 Star</option>
              <option value="4">4 Star</option>
              <option value="5">5 Star</option>
            </select>
          </div>
        </div>
      </form>
      {message && (
        <CustomAlert
          message={message}
          type={createMealPhoto.isSuccess ? "success" : "error"}
        />
      )}
    </>
  );
};

export default CreateMealPhoto;

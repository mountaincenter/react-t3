import React from "react";
import { isSameDay } from "date-fns";
import type { User, MealPhoto } from "@/app/types";
import MealRegistered from "./MealRegistered";
import MealRegistrationForm from "./MealRegistrationForm";

interface SelectedMealProps {
  user: User;
  selectedMeal: string;
  selectedDay: Date;
}

const SelectedMeal: React.FC<SelectedMealProps> = ({
  user,
  selectedMeal,
  selectedDay,
}) => {
  const mealPhotos: MealPhoto[] | undefined = user.mealPhotos.filter(
    (photo: MealPhoto) =>
      photo.mealType === selectedMeal &&
      isSameDay(selectedDay, photo.registeredDate),
  );

  console.log("mealPhotos", mealPhotos);

  return (
    <>
      {mealPhotos && mealPhotos.length > 0 ? (
        mealPhotos.map((photo: MealPhoto) => (
          <div key={photo.id}>
            <MealRegistered photo={photo} user={user} />
          </div>
        ))
      ) : (
        <MealRegistrationForm
          selectedMeal={selectedMeal}
          selectedDay={selectedDay}
          user={user}
        />
      )}
    </>
  );
};

export default SelectedMeal;

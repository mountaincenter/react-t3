import React from "react";
import RatingComponent from "./RatingComponent";

interface MealDescriptionFormProps {
  ratings: number;
  setRatings: (ratings: number) => void;
  description: string;
  setDescription: (description: string) => void;
}

const MealDescriptionForm: React.FC<MealDescriptionFormProps> = ({
  ratings,
  setRatings,
  description,
  setDescription,
}) => {
  return (
    <div className="w-full">
      <RatingComponent
        initialRatings={ratings}
        readOnly={false}
        onRatingChange={setRatings}
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full rounded-lg border px-4 py-2 focus:border-blue-400 focus:outline-none"
      />
    </div>
  );
};

export default MealDescriptionForm;

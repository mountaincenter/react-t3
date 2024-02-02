import React, { useState, useEffect } from "react";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";

interface RatingComponentProps {
  initialRatings: number;
  readOnly?: boolean;
  onRatingChange?: (rating: number) => void;
}

const RatingComponent: React.FC<RatingComponentProps> = ({
  initialRatings,
  readOnly = false,
  onRatingChange,
}) => {
  const [ratings, setRatings] = useState<number>(initialRatings);
  const [hoverRatings, setHoverRatings] = useState<number>(0);

  console.log("initialRatings", initialRatings);

  useEffect(() => {
    setRatings(initialRatings);
  }, [initialRatings]);

  const handleMouseEnter = (index: number) => {
    if (readOnly) return;
    setHoverRatings(index);
  };

  const handleMouseLeave = () => {
    setHoverRatings(0);
  };

  const handleClick = (index: number) => {
    if (readOnly) return;
    setRatings(index);
    onRatingChange?.(index);
  };

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((index) => {
        const fill =
          hoverRatings >= index || (!hoverRatings && ratings >= index);
        return (
          <span
            key={index}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(index)}
          >
            {fill ? (
              <StarIconSolid className="h-6 w-6 text-yellow-500 transition duration-150 ease-in-out" />
            ) : (
              <StarIconOutline className="h-6 w-6 text-gray-400 transition duration-150 ease-in-out" />
            )}
          </span>
        );
      })}
    </div>
  );
};

export default RatingComponent;

"use client";
import { useState } from "react";
import { Star } from "lucide-react";

interface RatingStarsProps {
  onChange?: (rating: number) => void;
}

export default function RatingStars({ onChange }: RatingStarsProps) {
  const [rating, setRating] = useState(0);

  const handleClick = (star: number) => {
    setRating(star);
    if (onChange) onChange(star);
  };

  return (
    <div className="flex ml-2.5">
      {Array.from({ length: 5 }, (_, index) => {
        const starNumber = index + 1;
        return (
          <Star
            key={index} strokeWidth={1}
            className="cursor-pointer transition-colors text-primary h-3.5 w-3.5"
            fill={starNumber <= (rating) ? "currentColor" : "none"}
            stroke={starNumber <= (rating) ? "currentColor" : "currentColor"}
            onClick={() => handleClick(starNumber)}
          />
        );
      })}
    </div>
  );
}
import { useState } from "react";

function StarRating({ setStars }) {
  const [hoverRating, setHoverRating] = useState(0);

  const renderStar = (i) => {
    if (hoverRating >= i) {
      return "★";
    }
    return "☆";
  };

  return (
    <div>
      {Array.from({ length: 5 }, (_, i) => i + 1).map((_, i) => (
        <span
          key={i}
          onMouseEnter={() => setHoverRating(i + 1)}
          onMouseLeave={() => setHoverRating(0)}
          onClick={() => setStars(i + 1)}
        >
          {renderStar(i + 1)}
        </span>
      ))}
    </div>
  );
}

export default StarRating;

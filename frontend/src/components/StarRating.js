import { useState } from "react";

function StarRating({ setStars, selectedStars }) {
  const [hoverRating, setHoverRating] = useState(0);

  const renderStar = (i) => {
    if (hoverRating >= i) {
      return "★";
    } else if (selectedStars >= i) {
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
          onClick={() => {
            setHoverRating(i + 1);
            setStars(i + 1);
          }}
        >
          {renderStar(i + 1)}
        </span>
      ))}
      <span className="star-text">Stars</span>
    </div>
  );
}

export default StarRating;

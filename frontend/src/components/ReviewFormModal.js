import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addReviewThunk } from "../store/reviews"; // Import the thunk

export default function ReviewFormModal({ spotId, closeModal }) {
  const [review, setReview] = useState("");
  const [stars, setStars] = useState(0);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset any previous errors

    const reviewDetails = { review, stars };
    try {
      await dispatch(addReviewThunk(spotId, reviewDetails));
      closeModal(); // Close the modal on successful submission
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  const isDisabled = review.length < 10 || stars === 0;

  return (
    <div>
      <h1>How was your stay?</h1>
      {error && <div>{error}</div>}
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Leave your review here..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
        <div>
          <input
            type="number"
            min="1"
            max="5"
            value={stars}
            onChange={(e) => setStars(Number(e.target.value))}
          />
          <label>Stars</label>
        </div>
        <button type="submit" disabled={isDisabled}>
          Submit Your Review
        </button>
      </form>
    </div>
  );
}

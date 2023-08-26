import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addReviewThunk } from "../store/reviews"; // Import the thunk
import StarRating from "./StarRating";

// showModal and closeModal are being passed into the ReviewFormModal as props, so we don't need to define those within the function anymore
export default function ReviewFormModal({ spotId, showModal, closeModal }) {
  const [review, setReview] = useState("");
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!showModal) {
      setReview("");
      setStars(0);
      setErrors(null);
    }
  }, [showModal]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reviewDetails = { review, stars };
    try {
      await dispatch(addReviewThunk(spotId, reviewDetails));
      closeModal(); // Close the modal on successful submission
    } catch (err) {
      setErrors("An error occurred. Please try again.");
    }
  };

  return (
    <div className={`modal ${showModal ? "is-active" : ""}`}>
      <div className="modal-background"></div>
      <div className="modal-content">
        <h1>How was your stay?</h1>
        {errors && <div className="error">{errors}</div>}
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="Leave your review here..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
          <StarRating setStars={setStars} />
          <button type="submit" disabled={review.length < 10 || stars === 0}>
            Submit Your Review
          </button>
        </form>
      </div>
      <button className="modal-close is-large" onClick={closeModal}></button>
    </div>
  );
}

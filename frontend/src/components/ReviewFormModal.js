import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { addReviewThunk } from "../store/reviews"; // Import the thunk
import StarRating from "./StarRating";
import "./styles/ReviewForm.css";

// showModal and closeModal are being passed into the ReviewFormModal as props, so we don't need to define those within the function anymore
export default function ReviewFormModal({ spotId, showModal, closeModal }) {
  const [review, setReview] = useState("");
  // This state holds the selected stars
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

    dispatch(addReviewThunk(spotId, reviewDetails))
      .then(() => {
        closeModal();
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.message) setErrors(data.message);
        else setErrors("An error occurred. Please try again.");
      });
  };
  // useEffect code for closing ReviewFormModal when we click outside of it
  const modalRef = useRef();
  useEffect(() => {
    // When click outside
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Cleanup: Remove event listener
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeModal]);

  return (
    <div className={`modal-review-overlay ${showModal ? "is-active" : ""}`}>
      <div className="modal-review"></div>
      {/* Attach ref below */}
      <div className="modal-review-content" ref={modalRef}>
        <form onSubmit={handleSubmit}>
          <h1>How was your stay?</h1>
          {errors && <div className="error-message">{errors}</div>}
          <textarea
            placeholder="Leave your review here..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
          <StarRating setStars={setStars} selectedStars={stars} />
          <button type="submit" disabled={review.length < 10 || stars === 0}>
            Submit Your Review
          </button>
        </form>
      </div>
    </div>
  );
}

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReviews } from "../store/reviews";

function Reviews({ spotId }) {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews[spotId] || []);

  useEffect(() => {
    dispatch(fetchReviews(spotId));
  }, [dispatch, spotId]);

  return (
    <div className="reviewsContainer">
      {reviews.map((review) => (
        <div key={review.id} className="review">
          <div className="reviewerName">{review.User.firstName}</div>
          <div className="reviewDate">
            {new Date(review.createdAt).toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </div>
          <div className="reviewText">{review.review}</div>
        </div>
      ))}
    </div>
  );
}

export default Reviews;
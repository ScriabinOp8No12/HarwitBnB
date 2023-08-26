import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReviews } from "../store/reviews";

function Reviews({ spotId }) {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews[spotId] || []);

  console.log("REVIEWS STATE? ", reviews);
  useEffect(() => {
    dispatch(fetchReviews(spotId));
  }, [dispatch, spotId]);

  // Sort reviews by most recent first
  const sortedReviews = reviews.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div className="reviewsContainer">
      {sortedReviews.map((review) => (
        <div key={review.id} className="review">
          <div className="reviewerName">
            {review.User ? review.User.firstName : "Anonymous"}
          </div>
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

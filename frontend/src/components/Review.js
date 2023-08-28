import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReviews } from "../store/reviews";
import DeleteReviewModal from "./DeleteReviewModal";

// Added currentUser props, and originally added userHasPostedReview props
function Reviews({ spotId, currentUser }) {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews[spotId] || []);

  useEffect(() => {
    dispatch(fetchReviews(spotId));
  }, [dispatch, spotId]);

  // ******* WITH REVIEWS in dependency array, the firstName of reviewer shows up properly when we post the review, but otherwise we get an infinite loop
  // useEffect(() => {
  //   dispatch(fetchReviews(spotId));
  // }, [dispatch, spotId, reviews]);

  // Sort reviews by most recent first
  const sortedReviews = reviews.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  // Call this function when a review is successfully posted
  // const handleReviewPosted = () => {
  //   if (onReviewPosted) {
  //     onReviewPosted();
  //   }
  // };

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
          {/* ONLY RENDER DELETE REVIEW MODAL if userId of the review matches the id of the logged in user (currentUser) */}
          {currentUser && review.userId === currentUser.id && (
            <DeleteReviewModal reviewId={review.id} />
          )}
        </div>
      ))}
    </div>
  );
}

export default Reviews;

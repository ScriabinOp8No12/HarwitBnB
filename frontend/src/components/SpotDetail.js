import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Reviews from "./Review";
import ReviewFormModal from "./ReviewFormModal";
import { fetchSpot } from "../store/spotDetail"; // import fetchSpot (singular) thunk
import { fetchReviews } from "../store/reviews";
import "./styles/SpotDetail.css";

// Function to format the star rating / round it properly
function formatRating(rating) {
  const formattedRating = parseFloat(rating).toFixed(2);
  return formattedRating.endsWith("0")
    ? formattedRating.slice(0, -1) // If the rating ends with "0", remove the last character
    : formattedRating;
}

function SpotDetail() {
  // const [errors, setErrors] = useState(null);

  // modal states for review modal
  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const dispatch = useDispatch();
  const { spotId } = useParams(); // Get spot ID from the URL
  const spot = useSelector((state) => state.spot.spot); // Getting specific spot slice of state from store

  // Get the current user from the session slice of the Redux store
  const currentUser = useSelector((state) => state.session.user);

  // Fetching specific spot when component mounts
  useEffect(() => {
    dispatch(fetchSpot(spotId));
  }, [dispatch, spotId]);

  // handling reservation click, need to sometimes ghost it out / disable it like the login in button
  const handleReservationClick = () => {
    alert("Feature coming soon");
  };

  // selecting main image and 4 other images, which will be styled to be smaller with css
  // ? is optional chaining, it won't throw an error if SpotImages doesn't exist, it'll just returned undefined instead
  const mainImage = spot.SpotImages?.find((image) => image.preview)?.url;
  // Needed to add the || [] at the end to avoid using map on an undefined value (~line 36)
  const otherImages =
    spot.SpotImages?.filter((image) => !image.preview).slice(0, 4) || [];

  const formattedRating = formatRating(spot.avgStarRating);

  /**********   Add Reviews **************/

  // Fetch reviews when component mounts
  useEffect(() => {
    dispatch(fetchReviews(spotId));
  }, [dispatch, spotId]);

  // Fetch the reviews for this spot from the Redux store
  const reviews = useSelector((state) => state.reviews[spotId] || []);

  // New useEffect to listen for changes in reviews
  useEffect(() => {
    // Refetch the spot details when reviews change
    dispatch(fetchSpot(spotId));
  }, [dispatch, spotId, reviews]);

  // Check if the current user has posted a review for this spot
  // The .some() method returns true if at least one thing is true, in this example, if at least one review has the same userId as the currentUser
  const userHasPostedReview = reviews.some(
    (review) => currentUser && review.userId === currentUser.id
  );

  // Check if the current user is the owner of the spot
  const isOwner = currentUser && currentUser.id === spot.ownerId;

  return (
    <div className="spotDetailContainer">
      {/* Display spot's name */}
      <h1>{spot.name}</h1>
      {/* {errors && <div className="error">{errors}</div>} */}
      <div className="location">
        {/* Display spot's location in city, state, country format */}
        {spot.city}, {spot.state}, {spot.country}
      </div>
      <div className="images">
        {/* Main, large image on the left */}
        <img src={mainImage} alt={spot.name} className="largeImage" />
        {/* 4 smaller images on the right of the main, large image, loop through to grab first 4 (see lines 35-36) */}
        <div className="smallImages">
          {otherImages.map((image, index) => (
            <img
              src={image.url}
              alt={`${spot.name} ${index}`}
              key={index}
              className="smallImage"
            />
          ))}
        </div>
      </div>
      <div className="contentContainer">
        <div className="description">
          {/* Host information, includes firstname and lastname, Owner object is in the response with this info */}
          <div className="hostedBy">
            {spot.ownerId &&
              `Hosted by ${spot.Owner?.firstName} ${spot.Owner?.lastName}`}
          </div>

          <div className="spotDescription">{spot.description}</div>
        </div>
        <div className="calloutInfoBoxContainer">
          <div className="calloutInfoBox">
            <div className="ratingPriceContainer">
              <div className="price">
                ${spot.price} <span>night</span>
              </div>
              {/* Ternary logic -> if reviews greater than 1, then format it with a star, a dot,
              then the number of review, if reviews equals 1, then use singular "review" instead of "reviews"
              and otherwise (no reviews), just have a star with the word "new" on the right of it */}
              {spot.numReviews > 1 ? (
                <>
                  <span className="stars">★ {formattedRating}</span>
                  <span className="middleDot">·</span>
                  <span className="reviewCount">{spot.numReviews} reviews</span>
                </>
              ) : spot.numReviews === 1 ? (
                <>
                  <span className="stars">★ {formattedRating}</span>
                  <span className="middleDot">·</span>
                  <span className="reviewCount">{spot.numReviews} review</span>
                </>
              ) : (
                <span className="stars">★ New</span>
              )}
            </div>
            <button onClick={handleReservationClick} className="reserveButton">
              Reserve
            </button>
          </div>
        </div>
      </div>
      {/* Same logic for reviews as for the calloutInfoBox, but we use different css class names so we
      can increase the size of the elements and/or style them differently too */}
      <div className="reviewSummaryContainer">
        {spot.numReviews > 1 ? (
          <>
            <span className="stars">★ {formattedRating}</span>
            <span className="middleDot">·</span>
            <span className="reviewCount">{spot.numReviews} reviews</span>
          </>
        ) : spot.numReviews === 1 ? (
          <>
            <span className="stars">★ {formattedRating}</span>
            <span className="middleDot">·</span>
            <span className="reviewCount">{spot.numReviews} review</span>
          </>
        ) : (
          <span className="stars">★ New</span>
        )}
      </div>
      {/* Conditionally render the ReviewFormModal */}
      {/* It will only render if there's a logged-in user, who hasn't posted a review, and isn't the owner */}
      {currentUser && !userHasPostedReview && !isOwner && (
        <button onClick={openModal}>Post Your Review</button>
      )}
      {showModal && (
        <ReviewFormModal
          spotId={spotId}
          showModal={showModal}
          closeModal={closeModal}
        />
      )}

      {/* Logic for if the message "Be the first to post a review!" should be displayed
      Only display it if these 3 conditions are both satisfied:
      1. There are no reviews for this spot
      2. There is a logged in user
      3. The logged in user is NOT the owner of the spot */}
      {spot.numReviews === 0 &&
      currentUser &&
      currentUser.id !== spot.ownerId ? (
        <div>Be the first to post a review!</div>
      ) : (
        // Added additional props to Reviews component that gets rendered here
        <Reviews
          spotId={spotId}
          currentUser={currentUser}
          userHasPostedReview={userHasPostedReview}
        />
      )}
      {/* Add delete review modal here */}
      {/* <div>
        <DeleteReviewModal />
      </div> */}
    </div>
  );
}

export default SpotDetail;

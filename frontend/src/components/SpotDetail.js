import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSpot } from "../store/spotDetail"; // import fetchSpot (singular) thunk
import Reviews from "./Review";
import "./styles/SpotDetail.css";

// Function to format the star rating / round it properly
function formatRating(rating) {
  const formattedRating = parseFloat(rating).toFixed(2);
  return formattedRating.endsWith("0")
    ? formattedRating.slice(0, -1)
    : formattedRating;
}

function SpotDetail() {
  const dispatch = useDispatch();
  const { spotId } = useParams(); // Get spot ID from the URL
  const spot = useSelector((state) => state.spot.spot); // Getting specific spot from store

  // Fetching specific spot when component mounts
  useEffect(() => {
    dispatch(fetchSpot(spotId));
  }, [dispatch, spotId]);

  // handling reservation click, need to sometimes ghost it out / disable it like the login in button
  const handleReservationClick = () => {
    alert("Feature coming soon");
  };

  // seleting main image and 4 other images, which will be styled to be smaller with css
  // ? is optional chaining, it won't throw an error if SpotImages doesn't exist, it'll just returned undefined instead
  const mainImage = spot.SpotImages?.find((image) => image.preview)?.url;
  // Needed to add the || [] at the end to avoid using map on an undefined value (~line 38)
  const otherImages =
    spot.SpotImages?.filter((image) => !image.preview).slice(0, 4) || [];

  const formattedRating = formatRating(spot.avgStarRating);

  return (
    <div className="spotDetailContainer">
      <h1>{spot.name}</h1>
      <div className="location">
        {spot.city}, {spot.state}, {spot.country}
      </div>
      <div className="images">
        <img src={mainImage} alt={spot.name} className="largeImage" />
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
              {/* If there are more than 1 review, then we put a star, a dot, and the number of reviews */}
              {spot.numReviews > 1 ? (
                <>
                  <span className="stars">★ {formattedRating}</span>
                  <span className="middleDot">·</span>
                  <span className="reviewCount">{spot.numReviews} reviews</span>
                </>
              ) : // If there's exactly one review, we will show review instead of reviews as the text
              spot.numReviews === 1 ? (
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
      <Reviews spotId={spotId} />
    </div>
  );
}

export default SpotDetail;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSpot } from "../store/spotDetail"; // import fetchSpot (singular) thunk
import "./styles/SpotDetail.css";

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
      <div className="hostedBy">
        {/* Since our postman response for get spots/:id shows us the logged in Owner object info, we can access it like below */}
        {spot.ownerId &&
          `Hosted by ${spot.Owner?.firstName} ${spot.Owner?.lastName}`}
      </div>
      {/* Description for the spot, maybe we want to make it much more text to see how it wraps? */}
      <div className="spotDescription">{spot.description}</div>
      <div className="calloutInfoBox">
        <div className="price">
          ${spot.price} <span>night</span>
        </div>
        <button onClick={handleReservationClick} className="reserveButton">
          Reserve
        </button>
      </div>
    </div>
  );
}

export default SpotDetail;

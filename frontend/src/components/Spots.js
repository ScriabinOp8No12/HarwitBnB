import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchSpots } from "../store/spots"; // Import fetchSpots thunk
import "./styles/LandingPage.css";

// Function to format the star rating / round it properly
function formatRating(rating) {
  const formattedRating = parseFloat(rating).toFixed(2);
  return formattedRating.endsWith("0")
    ? formattedRating.slice(0, -1)
    : formattedRating;
}

function Spots() {
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spots.spots); // Getting all spots from store

  // Fetching spots when component mounts
  useEffect(() => {
    dispatch(fetchSpots());
  }, [dispatch]);

  return (
    <div className="containerDiv">
      {spots.map((spot) => {
        // Call formatRating for each individual spot
        const formattedRating = formatRating(spot.avgRating);

        return (
          // Linking to detail page for each spot
          <Link to={`/spots/${spot.id}`} key={spot.id} className="spotLink">
            {/* Tooltip with name of the spot */}
            <div title={spot.name} className="spotContainer">
              {/* Display image if it exists */}
              <div className="previewImage">
                {spot.previewImage && (
                  <img src={spot.previewImage} alt={spot.name} />
                )}
              </div>
              <div className="textStarsContainer">
                <div className="spotDetails">
                  {/* Displaying city and state of the spot */}
                  <span>
                    {spot.city}, {spot.state}
                  </span>
                  <div>
                    {/* Display price of spot */}
                    <span className="price">${spot.price}</span>{" "}
                    <span>night</span>
                  </div>
                </div>
                <div className="stars">
                  {/* Displaying average star rating if it exists, otherwise displays "New" */}
                  {spot.avgRating ? (
                    <span>★ {formattedRating}</span>
                  ) : (
                    <span>New</span>
                  )}
                </div>
                {/* textStarsContainer wraps all the text up to here */}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default Spots;

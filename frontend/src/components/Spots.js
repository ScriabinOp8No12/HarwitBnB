import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchSpots } from "../store/spots"; // Import fetchSpots thunk

function Spots() {
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spots.spots); // Getting all spots from store

  // Fetching spots when component mounts
  useEffect(() => {
    dispatch(fetchSpots());
  }, [dispatch]);

  return (
    <div>
      {spots.map((spot) => (
        // Linking to detail page for each spot
        <Link
          to={`/spots/${spot.id}`}
          key={spot.id}
          // style={{ textDecoration: "none", color: "inherit" }}
        >
          {/* Tooltip with name of the spot */}
          <div title={spot.name}>
            {/* Display image if it exists */}
            {spot.previewImage && (
              <img src={spot.previewImage} alt={spot.name} />
            )}
            <div>
              {/* Displaying city and state of the spot */}
              <span>
                {spot.city}, {spot.state}
              </span>
              <div>
                {/* Displaying average star rating if it exists, otherwise displays "New" */}
                {spot.avgRating ? (
                  <span>{spot.avgRating} stars</span>
                ) : (
                  <span>New</span>
                )}
              </div>
              <div>
                {/* Display price of spot */}
                <span>${spot.price} / night</span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Spots;

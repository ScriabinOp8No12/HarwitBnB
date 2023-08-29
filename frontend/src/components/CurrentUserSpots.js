import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchCurrentUserSpots } from "../store/spots";
import { openModal } from "../store/modal";
import DeleteSpotModal from "./DeleteSpotModal";
import "./styles/CurrentUserSpots.css";

// Function to format the star rating / round it properly
function formatRating(rating) {
  const formattedRating = parseFloat(rating).toFixed(2);
  return formattedRating.endsWith("0")
    ? formattedRating.slice(0, -1)
    : formattedRating;
}

function CurrentUserSpots() {
  const dispatch = useDispatch();
  // Getting all current spots from store, key into the spots object first, then into the currentspots array with dot notation
  const spots = useSelector((state) => state.spots.currentSpots);

  // Fetching current user's spots when component mounts
  useEffect(() => {
    dispatch(fetchCurrentUserSpots());
  }, [dispatch]);

  const history = useHistory();

  const redirectToNewSpotForm = () => {
    history.push("/spots");
  };

  // Verify that spotId passed in is actually correct syntax
  const redirectToUpdateForm = (spotId) => {
    // Add the 2nd arg, with the state object specifying the method type
    history.push(`/spots/${spotId}/update`, { method: "PUT" });
  };

  const openDeleteModal = (spotId) => {
    dispatch(openModal(<DeleteSpotModal spotId={spotId} />));
  };

  return (
    <>
      <h1 className="manageSpots">Manage Spots</h1>
      {/* <button className="createNewSpotButton">Create a New Spot</button> */}
      {spots && spots.length === 0 ? (
        <button
          className="create-new-spot-manage-spots"
          onClick={redirectToNewSpotForm}
        >
          Create a New Spot
        </button>
      ) : null}

      <div className="containerDiv">
        {spots &&
          spots.map((spot) => {
            // Call formatRating for each individual spot
            const formattedRating = formatRating(spot.avgRating);

            return (
              // Linking to detail page for each spot
              // <Link to={`/spots/${spot.id}`} key={spot.id} className="spotLink">
              <div className="spotWrapper" key={spot.id}>
                <div
                  onClick={() => history.push(`/spots/${spot.id}`)}
                  className="spotLink"
                >
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
                  <div className="updateDeleteButtons">
                    <button
                      className="update-button-user-spots"
                      onClick={(e) => {
                        e.stopPropagation();
                        redirectToUpdateForm(spot.id);
                      }}
                    >
                      Update
                    </button>
                    <span className="separateUpdateDelete"></span>
                    <button
                      className="delete-button-user-spots"
                      onClick={(e) => {
                        e.stopPropagation();
                        openDeleteModal(spot.id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default CurrentUserSpots;

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateSpot, fetchSpotById } from "../store/spots";
import "./styles/SpotForm.css";

function UpdateSpotForm({ spotId }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [spotDetails, setSpotDetails] = useState({
    // All the form input fields, omit pictures for now
    country: "",
    address: "",
    city: "",
    state: "",
    lat: "",
    lng: "",
    description: "",
    name: "",
    price: "",
  });

  // ******** Fetch existing spot data when in "update" mode
  useEffect(() => {
    // console.log("Fetching existing spot");
    dispatch(fetchSpotById(spotId)).then((existingSpot) => {
      // console.log("Received existing spot:", existingSpot);
      if (existingSpot) {
        setSpotDetails(existingSpot);
        // console.log("Updated spotDetails state:", spotDetails);
      }
    });
  }, [dispatch, spotId]);

  // Handle errors as an OBJECT instead of an array
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSpotDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = [];
    for (const [key, value] of Object.entries(spotDetails)) {
      if (
        // Bug here too, had to also check if value is undefined or null, otherwise update form just doesn't work!
        value === undefined ||
        value === null ||
        (value === "" && key !== "images" && key !== "previewImage")
      ) {
        newErrors.push(
          `${key.charAt(0).toUpperCase() + key.slice(1)} is required`
        );
      }
    }
    // Of the description length is less than 30 and isn't 0,
    // then show the special message, otherwise it will show description is required
    if (
      spotDetails.description.length < 30 &&
      spotDetails.description.length !== 0
    ) {
      newErrors.push("Description needs 30 or more characters");
    }

    return newErrors;
  };

  // ***** FUN BUG, if NO reviews exist, it throws an error that seems unrelated
  // "avgStarRating is required" and "numReviews is required"

  const simplifiedSpotDetails = {
    address: spotDetails.address,
    city: spotDetails.city,
    state: spotDetails.state,
    country: spotDetails.country,
    lat: parseFloat(spotDetails.lat),
    lng: parseFloat(spotDetails.lng),
    name: spotDetails.name,
    description: spotDetails.description,
    price: parseFloat(spotDetails.price),
    // *********** NEED TO CHECK IF numReviews and avgStarRating are NOT 0
    // Because those are what it's set to initially before we dispatch, NOT NULL or Undefined
    // **** LOGIC: We don't include numReviews and avgStarRating in the dispatch object if these start at 0
    ...(spotDetails.numReviews !== 0 && { numReviews: spotDetails.numReviews }),
    ...(spotDetails.avgStarRating !== 0 && {
      avgStarRating: spotDetails.avgStarRating,
    }),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation
    const frontendErrors = validateForm();
    const errorObj = {};
    frontendErrors.forEach((error) => {
      const field = error.split(" ")[0].toLowerCase();
      errorObj[field] = error;
    });

    try {
      const updatedSpot = await dispatch(
        updateSpot(spotId, simplifiedSpotDetails)
      );
      if (Object.keys(errorObj).length === 0 && updatedSpot) {
        history.push(`/spots/${updatedSpot.id}`);
      }
    } catch (res) {
      const data = await res.json();
      if (data && data.errors) {
        // Merge frontend and backend errors
        const mergedErrors = { ...errorObj, ...data.errors };
        setErrors(mergedErrors);
      }
    }
  };

  return (
    <div>
      <form className="spotForm" onSubmit={handleSubmit}>
        <div className="headerContainer">
          {/* Dynamically render Update your spot text or create a new spot text based on if mode is update or not */}
          <h1>Update your Spot</h1>
          {/* Display validation errors at the top of the form */}
          <div className="errorMessages">
            {Object.keys(errors).length > 0 ? (
              Object.keys(errors).map((key, index) => (
                <p className="errorMessage" key={index}>
                  {errors[key]}
                </p>
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
        <h2 className="form-location-h2">Where's your place located?</h2>
        <p>
          Guests will only get your exact address once they booked a
          reservation.
        </p>
        <section>
          <label>
            Country:
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={spotDetails.country}
              onChange={handleChange}
            />
          </label>

          <label>
            Address:
            <input
              type="text"
              name="address"
              placeholder="Street Address"
              value={spotDetails.address}
              onChange={handleChange}
            />
          </label>

          <label className="city">
            City:
            <input
              type="text"
              name="city"
              placeholder="City"
              value={spotDetails.city}
              onChange={handleChange}
            />
          </label>
          <span className="separator"></span>

          <label className="state">
            State:
            <input
              type="text"
              name="state"
              placeholder="State"
              value={spotDetails.state}
              onChange={handleChange}
            />
          </label>

          <label className="side-by-side">
            Latitude:
            <input
              type="number"
              name="lat"
              placeholder="Latitude"
              value={spotDetails.lat}
              onChange={handleChange}
            />
          </label>
          <span className="separator"></span>
          <label className="side-by-side">
            Longitude:
            <input
              type="number"
              name="lng"
              placeholder="Longitude"
              value={spotDetails.lng}
              onChange={handleChange}
            />
          </label>
        </section>
        <section>
          <h2>Describe your place to guests</h2>
          <p>
            Mention the best features of your space, any special amenities like
            fast wifi or parking, and what you love about the neighborhood.
          </p>
          <textarea
            name="description"
            placeholder="Please write at least 30 characters"
            value={spotDetails.description}
            onChange={handleChange}
          ></textarea>
        </section>
        <section>
          <h2>Create a title for your spot</h2>
          <p>
            Catch guests' attention with a spot title that highlights what makes
            your place special.
          </p>
          <input
            type="text"
            name="name"
            placeholder="Name of your spot"
            value={spotDetails.name}
            onChange={handleChange}
          />
        </section>
        <section>
          <h2>Set a base price for your spot</h2>
          <p>
            Competitive pricing can help your listing stand out and rank higher
            in search results.
          </p>
          <label className="price">
            <input
              type="number"
              name="price"
              placeholder="Price per night (USD)"
              value={spotDetails.price}
              onChange={handleChange}
            />
          </label>
        </section>
        <button type="submit" className="create-spot-button">
          Update Spot
        </button>
      </form>
    </div>
  );
}

export default UpdateSpotForm;

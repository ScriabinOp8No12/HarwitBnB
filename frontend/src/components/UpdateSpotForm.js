import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateSpot, fetchSpotById } from "../store/spots";
import "./styles/SpotForm.css";

function UpdateSpotForm({ spotId }) {
  console.log("Received spotId:", spotId);
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

  // Handle errors as an array
  const [errors, setErrors] = useState([]);

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
      if (!value && key !== "images" && key !== "previewImage") {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (validationErrors.length === 0) {
      dispatch(updateSpot(spotId, spotDetails)).then((result) => {
        if (result.errors) {
          setErrors(result.errors);
        } else {
          history.push(`/spots/${result.id}`);
        }
      });
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div>
      <form className="spotForm" onSubmit={handleSubmit}>
        <section>
          <div className="headerContainer">
            {/* Dynamically render Update your spot text or create a new spot text based on if mode is update or not */}
            <h1>Update your Spot</h1>
            {/* Display validation errors at the top of the form */}
            {errors.length > 0 && (
              <div className="errorMessages">
                {errors.map((error, index) => (
                  <p key={index} className="errorMessage">
                    {error}
                  </p>
                ))}
              </div>
            )}
          </div>
          <h2>Where's your place located?</h2>
          <p>
            Guests will only get your exact address once they booked a
            reservation.
          </p>

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

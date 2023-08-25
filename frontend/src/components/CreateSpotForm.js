import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createSpot } from "../store/spots";

function CreateSpotForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [spotDetails, setSpotDetails] = useState({
    // All the form input fields
    country: "",
    streetAddress: "",
    city: "",
    state: "",
    description: "",
    latitude: "",
    longitude: "",
    title: "",
    price: "",
    previewImage: "",
    images: Array(5).fill(""), // Five image URLs
  });

  const [imageError, setImageError] = useState(false);
  // Handle errors as an array
  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("image")) {
      const index = Number(name.split("-")[1]);
      spotDetails.images[index] = value;
      setSpotDetails({ ...spotDetails });
    } else {
      setSpotDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = [];
    for (const [key, value] of Object.entries(spotDetails)) {
      if (!value && key !== "images") {
        newErrors.push(
          `${key.charAt(0).toUpperCase() + key.slice(1)} is required`
        );
      }
    }
    if (spotDetails.description.length < 30) {
      newErrors.push("Description needs 30 or more characters");
    }
    if (!spotDetails.previewImage) {
      newErrors.push("Preview Image URL is required");
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle image extension errors on form submission
    // Regex for ending with .jpg, .jpeg, and .png
    const invalidImage = spotDetails.images.some(
      (url) => url && !url.match(/\.(jpg|jpeg|png)$/)
    );

    if (invalidImage) {
      setImageError(true);
      return;
    }

    const validationErrors = validateForm();
    if (validationErrors.length === 0) {
      const newSpot = dispatch(createSpot(spotDetails));
      if (newSpot.errors) {
        // ********** This might be wrong: handling server side validation here
        setErrors(newSpot.errors);
      } else {
        history.push(`/spots/${newSpot.id}`); // Redirect to the newSpot's id after successful form submission
      }
    } else {
      setErrors(validationErrors);
    }
  };
  return (
    <div>
      <h1>Create a New Spot</h1>
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
      <form onSubmit={handleSubmit}>
        <section>
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
            Street Address:
            <input
              type="text"
              name="streetAddress"
              placeholder="Street Address"
              value={spotDetails.streetAddress}
              onChange={handleChange}
            />
          </label>
          <label>
            City:
            <input
              type="text"
              name="city"
              placeholder="City"
              value={spotDetails.city}
              onChange={handleChange}
            />
          </label>
          <label>
            State:
            <input
              type="text"
              name="state"
              placeholder="State"
              value={spotDetails.state}
              onChange={handleChange}
            />
          </label>
          <label>
            Latitude:
            <input
              type="text"
              name="latitude"
              placeholder="Latitude"
              value={spotDetails.latitude}
              onChange={handleChange}
            />
          </label>
          <label>
            Longitude:
            <input
              type="text"
              name="longitude"
              placeholder="Longitude"
              value={spotDetails.longitude}
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
            name="title"
            placeholder="Name of your spot"
            value={spotDetails.title}
            onChange={handleChange}
          />
        </section>
        <section>
          <h2>Set a base price for your spot</h2>
          <p>
            Competitive pricing can help your listing stand out and rank higher
            in search results.
          </p>
          <input
            type="number"
            name="price"
            placeholder="Price per night (USD)"
            value={spotDetails.price}
            onChange={handleChange}
          />
        </section>
        <section>
          <h2>Liven up your spot with photos</h2>
          <p>Submit a link to at least one photo to publish your spot.</p>
          {spotDetails.images.map((image, index) => (
            <input
              key={index}
              type="text"
              name={`image-${index}`}
              placeholder={index === 0 ? "Preview Image URL" : "Image URL"}
              value={image}
              onChange={handleChange}
            />
          ))}
          {imageError && (
            <p className="errorMessage">
              Image URL needs to end in png, jpg, or jpeg.
            </p>
          )}
        </section>
        <button type="submit">Create Spot</button>
      </form>
    </div>
  );
}
export default CreateSpotForm;

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { createSpot } from "../store/spots";
import "./styles/SpotForm.css";

function CreateSpotForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const [spotDetails, setSpotDetails] = useState({
    // All the form input fields
    country: "",
    address: "",
    city: "",
    state: "",
    lat: "",
    lng: "",
    description: "",
    name: "",
    price: "",
    previewImage: "", // make sure this matches the previewImage found in the thunk
    images: Array(4).fill(""), // Four additional optional image URLs, name needs to make thunk
  });

  const [imageErrors, setImageErrors] = useState(Array(4).fill(false));
  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("image")) {
      const index = Number(name.split("-")[1]);

      // Update the imageErrors array for image URL validation
      const newImageErrors = [...imageErrors];
      newImageErrors[index] = value !== "" && !value.match(/\.(jpg|jpeg|png)$/);

      if (index === 0) {
        // Update only the preview image
        setSpotDetails((prevDetails) => ({
          ...prevDetails,
          previewImage: value,
        }));
      } else {
        // Correctly map to the images array
        const adjustedIndex = index - 1;
        const newImages = [...spotDetails.images];
        newImages[adjustedIndex] = value;

        setSpotDetails((prevDetails) => ({
          ...prevDetails,
          images: newImages,
        }));
      }

      setImageErrors(newImageErrors);
    } else {
      setSpotDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
    }
  };

  const validateForm = () => {
    // Changed to object from array
    const newErrors = {};

    for (const [key, value] of Object.entries(spotDetails)) {
      if (!value && key !== "images" && key !== "previewImage") {
        newErrors[key] = `${
          key.charAt(0).toUpperCase() + key.slice(1)
        } is required`;
      }
    }
    // If the description length is less than 30 and isn't 0,
    // then show the special message, otherwise it will show description is required
    if (
      spotDetails.description.length < 30 &&
      spotDetails.description.length !== 0
    ) {
      newErrors.description = "Description needs 30 or more characters";
    }

    if (!spotDetails.previewImage) {
      newErrors.previewImage = "Preview Image URL is required";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation
    const frontendErrors = validateForm();

    // Handle image extension errors
    const newImageErrors = spotDetails.images.map(
      (url) => url && !url.match(/\.(jpg|jpeg|png)$/)
    );
    const invalidImage = newImageErrors.some((error) => error === true);

    if (invalidImage) {
      setImageErrors(newImageErrors);
      frontendErrors.images =
        "Image URL needs to be a valid url and end in png, jpg, or jpeg.";
    }

    try {
      const newSpot = await dispatch(createSpot(spotDetails));
      if (Object.keys(frontendErrors).length === 0 && newSpot) {
        history.push(`/spots/${newSpot.id}`);
      }
    } catch (res) {
      const data = await res.json();
      if (data && data.errors) {
        // Merge frontend and backend errors
        const mergedErrors = { ...frontendErrors, ...data.errors };
        setErrors(mergedErrors);
        // Scroll to the top of the page to show the error messages
        window.scrollTo(0, 0);
      }
    }
  };

  const resetForm = () => {
    setSpotDetails({
      country: "",
      address: "",
      city: "",
      state: "",
      lat: "",
      lng: "",
      description: "",
      name: "",
      price: "",
      previewImage: "",
      images: Array(4).fill(""),
    });
    setErrors([]);
  };

  useEffect(() => {
    if (location.pathname === "/spots") resetForm();
  }, [location]);

  return (
    <div>
      <form className="spotForm" onSubmit={handleSubmit}>
        {/* <section> */}
        <div className="headerContainer">
          <h1>Create a new Spot</h1>
          {/* Display validation errors at the top of the form */}
          <div className="errorMessages">
            {Object.keys(errors).map((key, index) => (
              <p className="errorMessage" key={index}>
                {errors[key]}
              </p>
            ))}
          </div>
        </div>
        <h2 className="form-location-h2">Where's your place located?</h2>
        <p>
          Guests will only get your exact address once they booked a
          reservation.
        </p>
        <section>
          <label>
            Country
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={spotDetails.country}
              onChange={handleChange}
            />
          </label>

          <label>
            Street Address
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={spotDetails.address}
              onChange={handleChange}
            />
          </label>

          <label className="city">
            City
            <input
              type="text"
              name="city"
              placeholder="City"
              value={spotDetails.city}
              onChange={handleChange}
            />
          </label>
          <span className="comma-separator">,</span>

          <label className="state">
            State
            <input
              type="text"
              name="state"
              placeholder="STATE"
              value={spotDetails.state}
              onChange={handleChange}
            />
          </label>

          <label className="side-by-side">
            Latitude
            <input
              type="number"
              name="lat"
              placeholder="Latitude"
              value={spotDetails.lat}
              onChange={handleChange}
            />
          </label>
          <span className="comma-separator">,</span>
          <label className="side-by-side">
            Longitude
            <input
              type="number"
              name="lng"
              placeholder="Longitude"
              value={spotDetails.lng}
              onChange={handleChange}
            />
          </label>
        </section>
        <div className="horizontal-line"></div> {/* Custom horizontal line */}
        <section>
          <h2>Describe your place to guests</h2>
          <p>
            Mention the best features of your space, any special amenities like
            fast wifi or parking, and what you love about the neighborhood.
          </p>
          <textarea
            className="description-field"
            name="description"
            placeholder="Please write at least 30 characters"
            value={spotDetails.description}
            onChange={handleChange}
          ></textarea>
        </section>
        <div className="horizontal-line"></div> {/* Custom horizontal line */}
        <section>
          <h2>Create a title for your spot</h2>
          <p>
            Catch guests' attention with a spot title that highlights what makes
            your place special.
          </p>
          <input
            className="name-spot-input"
            type="text"
            name="name"
            placeholder="Name of your spot"
            value={spotDetails.name}
            onChange={handleChange}
          />
        </section>
        <div className="horizontal-line"></div> {/* Custom horizontal line */}
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
        <div className="horizontal-line"></div> {/* Custom horizontal line */}
        <section>
          <h2>Liven up your spot with photos</h2>
          <p>Submit a link to at least one photo to publish your spot.</p>
          {/* Input for the Preview Image */}
          <div className="image-input">
            <input
              type="text"
              name="image-0"
              placeholder="Preview Image URL"
              value={spotDetails.previewImage}
              onChange={handleChange}
            />
            {imageErrors[0] && (
              <p className="errorMessage">
                Image URL needs to be a valid url and end in png, jpg, or jpeg.
              </p>
            )}
          </div>

          {/* Inputs for Additional Images */}
          {spotDetails.images.map((image, index) => (
            <div className="image-input" key={index}>
              <input
                type="text"
                name={`image-${index + 1}`}
                placeholder="Image URL"
                value={image}
                onChange={handleChange}
              />
              {imageErrors[index + 1] && (
                <p className="errorMessage">
                  Image URL needs to be a valid url and end in png, jpg, or
                  jpeg.
                </p>
              )}
            </div>
          ))}
        </section>
        <div className="horizontal-line"></div> {/* Custom horizontal line */}
        <button type="submit" className="create-spot-form-button">
          Create Spot
        </button>
      </form>
    </div>
  );
}
export default CreateSpotForm;

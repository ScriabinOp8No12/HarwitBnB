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
    previewImage: "",
    images: Array(5).fill(""), // Four additional optional image URLs (5)
  });

  const [imageErrors, setImageErrors] = useState(Array(5).fill(false));
  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("image")) {
      const index = Number(name.split("-")[1]);
      const newImages = [...spotDetails.images];
      newImages[index] = value;
      setSpotDetails((prevDetails) => ({
        ...prevDetails,
        previewImage: index === 0 ? value : prevDetails.previewImage,
        images: newImages,
      }));
      setImageErrors((prevErrors) => {
        const newErrors = [...prevErrors];
        if (value === "") {
          newErrors[index] = false;
        } else newErrors[index] = !value.match(/\.(jpg|jpeg|png)$/);
        return newErrors;
      });
    } else {
      setSpotDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value,
      }));
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
      images: Array(5).fill(""),
    });
    setErrors([]);
  };

  useEffect(() => {
    if (location.pathname === "/spots") resetForm();
  }, [location]);

  return (
    <div>
      <form className="spotForm" onSubmit={handleSubmit}>
        <section>
          <div className="headerContainer">
            <h1>Create a New Spot</h1>
            {/* Display validation errors at the top of the form */}
            <div className="errorMessages">
              {Object.keys(errors).map((key, index) => (
                <p className="errorMessage" key={index}>
                  {errors[key]}
                </p>
              ))}
            </div>
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
        <section>
          <h2>Liven up your spot with photos</h2>
          <p>Submit a link to at least one photo to publish your spot.</p>
          {spotDetails.images.map((image, index) => (
            <div className="image-input" key={index}>
              <input
                type="text"
                name={`image-${index}`}
                placeholder={index === 0 ? "Preview Image URL" : "Image URL"}
                value={image}
                onChange={handleChange}
              />
              {imageErrors[index] && ( // Use imageErrors array
                <p className="errorMessage">
                  Image URL needs to be a valid url and end in png, jpg, or
                  jpeg.
                </p>
              )}
            </div>
          ))}
        </section>
        <button type="submit" className="create-spot-button">
          Create Spot
        </button>
      </form>
    </div>
  );
}
export default CreateSpotForm;

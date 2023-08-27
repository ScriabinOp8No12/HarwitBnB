import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createSpot } from "../store/spots";
import "./styles/SpotForm.css";

function CreateSpotForm() {
  const dispatch = useDispatch();
  const history = useHistory();
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
    images: Array(5).fill(""), // Five image URLs
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
        newErrors[index] = !value.match(/\.(jpg|jpeg|png)$/);
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
    const newErrors = [];

    for (const [key, value] of Object.entries(spotDetails)) {
      if (!value && key !== "images" && key !== "previewImage") {
        newErrors.push(
          `${key.charAt(0).toUpperCase() + key.slice(1)} is required`
        );
      }
    }
    // If the description length is less than 30 and isn't 0,
    // then show the special message, otherwise it will show description is required
    if (
      spotDetails.description.length < 30 &&
      spotDetails.description.length !== 0
    ) {
      newErrors.push("Description needs 30 or more characters");
    }

    if (!spotDetails.previewImage) {
      newErrors.push("Preview Image URL is required");
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Handle image extension errors on form submission, regex for ending with .jpg, .jpeg, and .png
    const invalidImage = spotDetails.images.some(
      (url) => url && !url.match(/\.(jpg|jpeg|png)$/)
    );

    if (invalidImage) {
      setImageErrors(true);
      return;
    }

    // Show all validation errors from the backend, we need a try catch block to avoid the screen getting covered by a red message
    const validationErrors = validateForm();

    if (validationErrors.length === 0) {
      dispatch(createSpot(spotDetails))
        .then((newSpot) => {
          history.push(`/spots/${newSpot.id}`);
        })
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(data.errors); // Assuming errors is an object
          }
        });
    } else {
      const errorObj = {};
      validationErrors.forEach((error) => {
        const field = error.split(" ")[0].toLowerCase();
        errorObj[field] = error;
      });
      setErrors(errorObj);
    }
  };

  return (
    <div>
      <form className="spotForm" onSubmit={handleSubmit}>
        <section>
          <div className="headerContainer">
            <h1>Create a New Spot</h1>
            {/* Display validation errors at the top of the form */}
            <div className="errorMessages">
              {errors.country && (
                <p className="errorMessage">{errors.country}</p>
              )}
              {errors.address && (
                <p className="errorMessage">{errors.address}</p>
              )}
              {errors.city && <p className="errorMessage">{errors.city}</p>}
              {errors.state && <p className="errorMessage">{errors.state}</p>}
              {errors.lat && <p className="errorMessage">{errors.lat}</p>}
              {errors.lng && <p className="errorMessage">{errors.lng}</p>}
              {errors.description && (
                <p className="errorMessage">{errors.description}</p>
              )}
              {errors.name && <p className="errorMessage">{errors.name}</p>}
              {errors.price && <p className="errorMessage">{errors.price}</p>}
              {errors.previewImage && (
                <p className="errorMessage">{errors.previewImage}</p>
              )}
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
                  Image URL needs to end in png, jpg, or jpeg.
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

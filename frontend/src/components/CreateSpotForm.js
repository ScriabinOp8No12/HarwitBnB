import React, { useState } from "react";

function CreateSpotForm() {
  const [spotDetails, setSpotDetails] = useState({
    name: "",
    location: "",
    // Add other fields as needed
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSpotDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to create a new spot goes here
  };

  return (
    <div>
      <h1>Create a New Spot</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={spotDetails.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Location:
          <input
            type="text"
            name="location"
            value={spotDetails.location}
            onChange={handleChange}
          />
        </label>
        {/* Add other input fields as needed */}
        <button type="submit">Create Spot</button>
      </form>
    </div>
  );
}

export default CreateSpotForm;

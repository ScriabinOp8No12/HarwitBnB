import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteSpotById } from "../store/spots";
import "./styles/DeleteForm.css";

const DeleteSpotModal = ({ spotId }) => {
  const dispatch = useDispatch();
  const modalRef = useRef();
  const [showModal, setShowModal] = useState(true); // Local state to control modal visibility

  const handleDelete = () => {
    dispatch(deleteSpotById(spotId))
      .then(() => {
        setShowModal(false); // Close the modal on successful deletion
      })
      .catch((error) => {
        console.error("failed to delete spot:", error);
      });
  };

  useEffect(() => {
    // When click outside
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal(false); // Close the modal when clicking outside
      }
    };

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Cleanup: Remove event listener
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={`modal-overlay ${showModal ? "activeOverlay" : ""}`}>
      <div className="deleteModal" ref={modalRef}>
        <form>
          <h1 className="deleteText">Confirm Delete</h1>
          <p>Are you sure you want to remove this spot?</p>
          <button className="deleteButton" onClick={handleDelete}>
            Yes (Delete Spot)
          </button>
          <button className="cancelButton" onClick={() => setShowModal(false)}>
            No (Keep Spot)
          </button>
        </form>
      </div>
    </div>
  );
};

export default DeleteSpotModal;

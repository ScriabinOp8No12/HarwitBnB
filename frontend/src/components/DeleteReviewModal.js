import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteReviewThunk } from "../store/reviews";
import "./styles/DeleteForm.css"; // You may need to adjust the path

const DeleteReviewModal = ({ reviewId }) => {
  const dispatch = useDispatch();
  const modalRef = useRef();
  const [showModal, setShowModal] = useState(false); // Initially set to false

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteReviewThunk(reviewId))
      .then(() => {
        setShowModal(false); // Close the modal on successful deletion
      })
      .catch((error) => {
        console.error("Failed to delete review:", error);
      });
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="deleteReviewButton">
        <button onClick={() => setShowModal(true)}>Delete Review</button>
      </div>
      {showModal && (
        <div className={`modal-overlay ${showModal ? "activeOverlay" : ""}`}>
          <div className="deleteModal" ref={modalRef}>
            <form className="delete-modal-form">
              <h1 className="deleteText">Confirm Delete</h1>
              <p>Are you sure you want to delete this review?</p>
              <button className="deleteButton" onClick={(e) => handleDelete(e)}>
                Yes (Delete Review)
              </button>
              <button
                className="cancelButton"
                onClick={(e) => {
                  e.preventDefault();
                  setShowModal(false);
                }}
              >
                No (Keep Review)
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteReviewModal;

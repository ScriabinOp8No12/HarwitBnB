import React from "react";
import { useDispatch } from "react-redux";
import { deleteReviewThunk } from "../store/reviews";

const DeleteReviewModal = () => {
  const dispatch = useDispatch();

  const handleDeleteClick = () => {
    // Dispatch the action when the component mounts
    dispatch(deleteReviewThunk(6));
  };

  return (
    <button onClick={handleDeleteClick}>Delete Review Button/modal Test</button>
  );
};

export default DeleteReviewModal;

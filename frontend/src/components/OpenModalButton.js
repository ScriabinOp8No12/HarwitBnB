import React from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../store/modal";

function OpenModalButton({ buttonText, modalComponent }) {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(openModal(modalComponent));
  };

  return <button onClick={handleClick}>{buttonText}</button>;
}

export default OpenModalButton;

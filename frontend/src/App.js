import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, useHistory } from "react-router-dom";
import * as sessionActions from "./store/session";
import { closeModal } from "./store/modal"; // import closeModal action so we can close the modal with a click outside the modal
import Navigation from "./components/Navigation";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const modalComponent = useSelector((state) => state.modal.modalComponent);
  const history = useHistory();

  // function to close modal
  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  // Close modal when user clicks outside of it
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalComponent && !e.target.closest("modal")) {
        handleCloseModal();
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => document.removeEventListener("click", handleOutsideClick);
  }, [modalComponent]);

  // Close modal when user navigates to a different page
  useEffect(() => {
    return history.listen(() => {
      handleCloseModal();
    });
  }, [history]);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {modalComponent}
      {isLoaded && <Switch></Switch>}
    </>
  );
}

export default App;

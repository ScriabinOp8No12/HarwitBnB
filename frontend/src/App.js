import React, { useState, useEffect, useCallback } from "react";
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

  // function to close modal (wrap with useCallback to avoid rerending / warning in terminal)
  const handleCloseModal = useCallback(() => {
    dispatch(closeModal());
  }, [dispatch]);

  // Close modal when user clicks outside of it
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalComponent && !e.target.closest(".modal")) {
        handleCloseModal();
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => document.removeEventListener("click", handleOutsideClick);
  }, [modalComponent, handleCloseModal]);

  // Close modal when user navigates to a different page
  useEffect(() => {
    return history.listen(() => {
      handleCloseModal();
    });
  }, [history, handleCloseModal]);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {modalComponent && <div className="modal-overlay"></div>}
      {modalComponent}
      {isLoaded && <Switch></Switch>}
    </>
  );
}

export default App;

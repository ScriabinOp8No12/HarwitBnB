// modal.js

const OPEN_MODAL = "modal/openModal";
const CLOSE_MODAL = "modal/closeModal";

export const openModal = (modalComponent) => {
  return {
    type: OPEN_MODAL,
    payload: modalComponent,
  };
};

export const closeModal = () => {
  return {
    type: CLOSE_MODAL,
  };
};

const initialState = { modalComponent: null };

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return { modalComponent: action.payload };
    case CLOSE_MODAL:
      return { modalComponent: null };
    default:
      return state;
  }
};

export default modalReducer;

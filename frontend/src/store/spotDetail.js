// Action type
const SET_SPOT = "SET_SPOT";

// Action creators
export const setSpot = (spot) => ({
  type: SET_SPOT,
  spot,
});

// Thunks
export const fetchSpot = (spotId) => async (dispatch) => {
  // get the data from the get spotId endpoint, which is at /api/spots/:id

  const response = await fetch(`/api/spots/${spotId}`);
  if (!response.ok) {
    throw new Error("Network response was not ok!");
  }

  const data = await response.json();
  dispatch(setSpot(data)); // pass Spot data to the action creator
};

// Reducer
const initialState = { spot: {} }; // dealing with single spot, not array of spots

export default function spotDetailReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SPOT:
      return { ...state, spot: action.spot };
    default:
      return state;
  }
}

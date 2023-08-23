// Action type
const SET_SPOT = "SET_SPOT";

// Action creators
export const setSpot = (spot) => ({
  type: SET_SPOT,
  spot,
});

// Thunks
export const fetchSpot = (id) => async (dispatch) => {
  // get the data from the get spotId endpoint, which is at /api/spots/:id
  try {
    const { data } = await fetch(`/api/spots/${id}`);
    dispatch(setSpot(data)); // pass Spots array to the action creator
  } catch (error) {
    console.error("Error fetching spot: ", error);
  }
};

// Reducer
const initialState = { spots: {} }; // dealing with single spot, not array of spots

export default function spotDetailReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SPOT:
      return { ...state, spot: action.spot };
    default:
      return state;
  }
}

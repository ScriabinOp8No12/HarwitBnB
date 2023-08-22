// Action type
const SET_SPOTS = "spots/SET_SPOTS";

// Action creators
export const setSpots = (spots) => ({
  type: SET_SPOTS,
  spots,
});

// Thunks
export const fetchSpots = () => async (dispatch) => {
  // get the response from the get all spots endpoint, which is at /api/spots
  const response = await fetch("/api/spots");
  const { Spots } = await response.json(); // destructure Spots from response
  dispatch(setSpots(Spots)); // pass Spots array to the action creator
};

// Reducer
const initialState = { spots: [] };

export default function spotsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SPOTS:
      return { ...state, spots: action.spots };
    default:
      return state;
  }
}

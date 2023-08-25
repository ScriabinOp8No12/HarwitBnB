// Action type
const SET_SPOTS = "spots/SET_SPOTS";
// Create spot form action type
const CREATE_SPOT = "spots/CREATE_SPOT";

// Action create to set the spot for home page
export const setSpots = (spots) => ({
  type: SET_SPOTS,
  spots,
});

// Action creator for creating spot
export const createSpotAction = (spot) => ({
  type: CREATE_SPOT,
  spot,
});

// Thunks
// Fetch spots for home page
export const fetchSpots = () => async (dispatch) => {
  // get the response from the get all spots endpoint, which is at /api/spots
  const response = await fetch("/api/spots");
  const { Spots } = await response.json(); // destructure Spots from response
  dispatch(setSpots(Spots)); // pass Spots array to the action creator
};

// Create spot form thunk

export const createSpot = (spotDetails) => async (dispatch) => {
  const response = await fetch("/api/spots", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(spotDetails),
  });
  const newSpot = await response.json();
  dispatch(createSpotAction(newSpot));
  return newSpot;
};

// Reducer
const initialState = { spots: [] };

export default function spotsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SPOTS:
      return { ...state, spots: action.spots };
    case CREATE_SPOT:
      return { ...state, spots: [...state.spots, action.spot] };
    default:
      return state;
  }
}

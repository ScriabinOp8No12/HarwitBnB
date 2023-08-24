// Action type
const SET_REVIEWS = "SET_REVIEWS";

// Action creators
export const setReviews = (spotId, reviews) => ({
  type: SET_REVIEWS,
  spotId,
  reviews,
});

// Thunks
// Fetch reviews by Spot Id
export const fetchReviews = (spotId) => async (dispatch) => {
  // get the data from the get reviews endpoint, which is at /api/spots/:spotId/reviews

  const response = await fetch(`/api/spots/${spotId}/reviews`);
  if (!response.ok) {
    throw new Error("Network response was not ok!");
  }
  const data = await response.json();
  dispatch(setReviews(spotId, data.Reviews)); // pass Reviews data to the action creator
};

// Reducer

// dealing with an object where keys are spotIds
// reviews are now stored by spotId, so there's no overwritting
const initialState = {};

export default function reviewsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_REVIEWS:
      return { ...state, [action.spotId]: action.reviews }; // store reviews by spotId
    default:
      return state;
  }
}

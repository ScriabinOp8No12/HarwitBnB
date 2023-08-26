import { csrfFetch } from "./csrf";

// Action types
// Set / grab reviews from backend to load on the page
const SET_REVIEWS = "SET_REVIEWS";
// Add a review
const ADD_REVIEW = "ADD_REVIEW";

// Action creators
export const setReviews = (spotId, reviews) => ({
  type: SET_REVIEWS,
  spotId,
  reviews,
});

export const addReview = (spotId, review) => ({
  type: ADD_REVIEW,
  spotId,
  review,
});

// Thunks
// Fetch reviews by Spot Id
export const fetchReviews = (spotId) => async (dispatch) => {
  // get the data from the get reviews endpoint, which is at /api/spots/:spotId/reviews
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
  if (!response.ok) {
    throw new Error("Network response was not ok!");
  }
  const data = await response.json();
  dispatch(setReviews(spotId, data.Reviews)); // pass Reviews data to the action creator
};

// Thunk to add a review
export const addReviewThunk = (spotId, reviewDetails) => async (dispatch) => {
  // Use csrfFetch to post the review to the server
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reviewDetails),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok!");
  }

  const review = await response.json();
  dispatch(addReview(spotId, review)); // Dispatch the action to add the review
};

// Reducer
// dealing with an object where keys are spotIds
// reviews are now stored by spotId, so there's no overwritting
const initialState = {};

export default function reviewsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_REVIEWS:
      return { ...state, [action.spotId]: action.reviews }; // store reviews by spotId
    case ADD_REVIEW:
      return {
        ...state,
        [action.spotId]: [action.review, ...(state[action.spotId] || [])], // add the new review to the list of reviews for the given spotId AT THE TOP of the reviews
      };
    default:
      return state;
  }
}

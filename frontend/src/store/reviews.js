import { csrfFetch } from "./csrf";

/******* Action types ******/

// Set / get reviews from backend to load on the page
const SET_REVIEWS = "SET_REVIEWS";
// "post" review
const ADD_REVIEW = "ADD_REVIEW";

const UPDATE_SPOT_DETAILS = "UPDATE_SPOT_DETAILS";

const DELETE_REVIEW = "DELETE_REVIEW";

/********* Action creators ******/

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

export const updateSpotDetails = (spotId, details) => ({
  type: UPDATE_SPOT_DETAILS,
  spotId,
  details,
});

export const deleteReview = (reviewId) => ({
  type: DELETE_REVIEW,
  payload: { reviewId },
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
  // console.log("review: ", review);
  dispatch(addReview(spotId, review)); // Dispatch the action to add the review

  // Fetch updated spot details
  const updatedDataResponse = await csrfFetch(`/api/spots/${spotId}`);
  const updatedData = await updatedDataResponse.json();

  // console.log("Updated Data: ", updatedData);
  // console.log(updatedData.avgStarRating);
  // console.log(updatedData.numReviews);

  dispatch(
    updateSpotDetails(spotId, {
      avgStarRating: updatedData.avgStarRating,
      numReviews: updatedData.numReviews,
    })
  );
};

export const deleteReviewThunk = (reviewId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    dispatch(deleteReview(reviewId));
  } else {
    throw new Error("deleteReview Thunk failed");
  }
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
    case UPDATE_SPOT_DETAILS:
      return {
        ...state,
        spotDetails: {
          ...state.spotDetails,
          [action.spotId]: {
            avgStarRating: action.details.avgStarRating,
            numReviews: action.details.numReviews,
          },
        },
      };
    case DELETE_REVIEW:
      const { reviewId } = action.payload; // Destructure from payload
      const newState = { ...state };
      for (const spotId in newState) {
        // We initate reviews to empty object, so we need to only call filter if
        if (Array.isArray(newState[spotId])) {
          // Check if it's an array
          newState[spotId] = newState[spotId].filter(
            (review) => review.id !== reviewId
          );
        }
      }
      return newState;
    default:
      return state;
  }
}

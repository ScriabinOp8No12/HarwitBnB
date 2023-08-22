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
  const spots = await response.json();
  dispatch(setSpots(spots));
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

// ******** TO DYNAMICALLY CONSTRUCT QUERY PARAMETERS, FOR LATER? ***************
// function fetchSpots(queryParams) {
//   // Create a URLSearchParams object from the query parameters
//   const queryString = new URLSearchParams(queryParams).toString();

//   // Concatenate the query string to the base URL
//   const url = `/api/spots?${queryString}`;

//   // Fetch the data from the constructed URL
//   return fetch(url)
//     .then((response) => response.json())
//     .then((data) => {
//       // Handle the data here
//     });
// }

// // Example usage
// const queryParams = {
//   page: 2,
//   size: 10,
//   minPrice: 100,
//   maxPrice: 500,
// };
// fetchSpots(queryParams);

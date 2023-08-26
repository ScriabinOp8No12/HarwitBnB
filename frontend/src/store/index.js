import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import modalReducer from "./modal";
import spotsReducer from "./spots";
import spotDetailReducer from "./spotDetail";
import reviewsReducer from "./reviews";

// combine all the reducers with the Redux combineReducers function
const rootReducer = combineReducers({
  session: sessionReducer,
  modal: modalReducer,
  spots: spotsReducer,
  spot: spotDetailReducer,
  reviews: reviewsReducer,
});
// ***************** ABOVE, how to use the STATE in our components with useSelector function! **************** //
// The left is the object property we need to use to key into the initial property within the object
// For example, if we wanted to get into the spots object, we would have to do "state.spots" first
// Then now we are inside the spots object, then we have different states, like spots: [] and current_spots: [],
// so we need to key into that with dot notation
// {
//   spots: {
//     spots: [],
//     current_spots: []
//   },
//   // state from other reducers would go here
// }

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;

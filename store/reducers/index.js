import { combineReducers } from "redux";

import albumReducer from "./albumReducer";

export default combineReducers({
  albumState: albumReducer,
});

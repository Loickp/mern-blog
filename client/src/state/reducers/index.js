import { combineReducers } from "redux";
import authReducer from "./authReducer";
import postsReducer from "./postsReducer";

const reducers = combineReducers({
  authReducer,
  postsReducer
})

export default reducers
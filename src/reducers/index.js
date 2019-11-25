import { combineReducers } from "redux";
import usersReducer from "./usersReducer";
import publicationsReducer from "./publicationReducers";
import tasksReducer from "./tasksReducer";

export default combineReducers({
  usersReducer,
  publicationsReducer,
  tasksReducer
});

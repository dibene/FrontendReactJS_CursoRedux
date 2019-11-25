import { combineReducers } from 'redux';
import usersReducer from './usersReducer'
import publicationsReducer from "./publicationReducers";

export default combineReducers({
        usersReducer,
        publicationsReducer
});
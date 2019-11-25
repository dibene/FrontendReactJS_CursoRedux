import { LIST, LOADING, ERROR } from "../types/usersTypes";
const INITIAL_STATE = {
  users: [],
  loading: true,
  error: ""
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LIST:
      return { ...state, users: action.payload, loading: false };
    case LOADING:
      return { ...state, loading: true };
    case ERROR:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

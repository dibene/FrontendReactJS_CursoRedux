import {
  LIST,
  LOADING,
  ERROR,
  PER_USER,
  LOADING_COMMENTS,
  ERROR_COMMENTS
} from "../types/publicationsTypes";
const INITIAL_STATE = {
  publications: [],
  loading: false,
  loadingComments: false,
  error: "",
  errorComments: ""
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LIST:
      return { ...state, publications: action.payload, loading: false };
    case PER_USER:
      return {
        ...state,
        publications: action.payload,
        loading: false,
        loadingComments: false
      };
    case LOADING:
      return { ...state, loading: true };
    case LOADING_COMMENTS:
      return { ...state, loadingComments: true };
    case ERROR:
      return { ...state, error: action.payload, loading: false };
    case ERROR_COMMENTS:
      return { ...state, errorComments: action.payload, loadingComments: false };
    default:
      return state;
  }
};

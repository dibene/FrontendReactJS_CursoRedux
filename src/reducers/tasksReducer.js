import {
  TASKS_LIST,
  TASKS_LOADING,
  TASKS_ERROR,
  CHANGE_USERID,
  CHANGE_TITLE,
  TASKS_SAVE
} from "../types/tasksTypes";

const INITIAL_STATE = {
  tasks: [],
  loading: false,
  error: "",
  userId: "",
  title: "",
  back: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TASKS_LIST:
      return { ...state, tasks: action.payload, loading: false, back: false };
    case TASKS_LOADING:
      return { ...state, loading: true };
    case TASKS_ERROR:
      return { ...state, error: action.payload, loading: false };
    case CHANGE_USERID:
      return { ...state, userId: action.payload };
    case CHANGE_TITLE:
      return { ...state, title: action.payload };
    case TASKS_SAVE:
      return {
        ...state,
        tasks: {},
        loading: false,
        back: true,
        userId: "",
        title: ""
      };
    default:
      return state;
  }
};

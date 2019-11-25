import axios from "axios";
import { LIST, LOADING, ERROR } from "../types/usersTypes";

export const listUsers = () => async dispatch => {
  dispatch({
    type: LOADING
  });
  try {
    const url = "https://jsonplaceholder.typicode.com/users";
    const response = await axios.get(url);
    dispatch({
      type: LIST,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: 'Error: los usuarios no cargaron correctamente: '+error.message
    });
  }
};

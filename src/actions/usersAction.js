import axios from "axios";

export const listUsers = () => async (dispatch) => {
    const url = "https://jsonplaceholder.typicode.com/users";
    const response = await axios.get(url);
    dispatch({
        type: "USER_LIST",
        payload: response.data
    });
}
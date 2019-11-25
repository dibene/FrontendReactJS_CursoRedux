import axios from "axios";
import {
  LIST,
  LOADING,
  ERROR,
  PER_USER,
  LOADING_COMMENTS,
  ERROR_COMMENTS
} from "../types/publicationsTypes";
import * as userTypes from "../types/usersTypes";
const { LIST: USER_LIST } = userTypes;

export const list = () => async dispatch => {
  dispatch({
    type: LOADING
  });
  try {
    const url = "https://jsonplaceholder.typicode.com/posts";
    const response = await axios.get(url);
    dispatch({
      type: LIST,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload:
        "Error: las publicaciones no cargaron correctamente: " + error.message
    });
  }
};

export const publicationsPerUser = key => async (dispatch, getState) => {
  const { users } = getState().usersReducer;
  const { publications } = getState().publicationsReducer;

  const user_id = users[key].id;

  dispatch({
    type: LOADING
  });

  try {
    const url = `https://jsonplaceholder.typicode.com/posts?userId=${user_id}`;
    const response = await axios.get(url);

    const newPublications = response.data.map(publication => ({
      ...publication,
      comments: [],
      isOpen: false
    }));

    const updatePublications = [...publications, newPublications];

    const publications_key = updatePublications.length - 1;
    const updateUsers = [...users];
    updateUsers[key] = {
      ...users[key],
      publications_key
    };

    dispatch({
      type: USER_LIST,
      payload: updateUsers
    });
    dispatch({
      type: PER_USER,
      payload: updatePublications
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload:
        "Error: las publicaciones del usuario no cargaron correctamente: " +
        error.message
    });
  }
};

export const openClose = (publicationKey, commentKey) => (
  dispatch,
  getState
) => {
  const { publications } = getState().publicationsReducer;
  const publicationSelect = publications[publicationKey][commentKey];

  const publicationUpdate = {
    ...publicationSelect,
    isOpen: !publicationSelect.isOpen
  };

  const publicationsUpdate = [...publications];

  publicationsUpdate[publicationKey] = [...publications[publicationKey]];

  publicationsUpdate[publicationKey][commentKey] = publicationUpdate;

  dispatch({
    type: PER_USER,
    payload: publicationsUpdate
  });
};

export const bringComments = (publicationKey, commentKey) => async (
  dispatch,
  getState
) => {
  const { publications } = getState().publicationsReducer;
  const publicationSelect = publications[publicationKey][commentKey];
  const url = `https://jsonplaceholder.typicode.com/comments?postId=${publicationSelect.id}`;

  dispatch({
    type: LOADING_COMMENTS
  });

  try {
    const response = await axios.get(url);
    const publicationUpdate = {
      ...publicationSelect,
      comments: response.data
    };
    const publicationsUpdate = [...publications];

    publicationsUpdate[publicationKey] = [...publications[publicationKey]];

    publicationsUpdate[publicationKey][commentKey] = publicationUpdate;

    dispatch({
      type: PER_USER,
      payload: publicationsUpdate
    });
  } catch (error) {
    dispatch({
      type: ERROR_COMMENTS,
      payload:
        "Error: los comentarios de la publicacion no cargaron correctamente: " +
        error.message
    });
  }
};

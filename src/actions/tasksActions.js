import axios from "axios";
import {
  TASKS_LIST,
  TASKS_LOADING,
  TASKS_ERROR,
  CHANGE_USERID,
  CHANGE_TITLE,
  TASKS_SAVE
} from "../types/tasksTypes";

export const tasksList = () => async dispatch => {
  dispatch({
    type: TASKS_LOADING
  });
  try {
    const url = "https://jsonplaceholder.typicode.com/todos";
    const response = await axios.get(url);

    const tasks = {};
    response.data.map(
      task =>
        (tasks[task.userId] = {
          ...tasks[task.userId],
          [task.id]: { ...task }
        })
    );
    dispatch({
      type: TASKS_LIST,
      payload: tasks
    });
  } catch (error) {
    dispatch({
      type: TASKS_ERROR,
      payload: "Error: las tareas no cargaron correctamente: " + error.message
    });
  }
};

export const changeUserId = userId => dispatch => {
  dispatch({
    type: CHANGE_USERID,
    payload: userId
  });
};

export const changeTitle = title => dispatch => {
  dispatch({
    type: CHANGE_TITLE,
    payload: title
  });
};

export const save = newTask => async dispatch => {
  dispatch({
    type: TASKS_LOADING
  });
  try {
    const url = "https://jsonplaceholder.typicode.com/todos";
    const response = await axios.post(url, newTask);
    dispatch({
      type: TASKS_SAVE
    });
  } catch (error) {
    dispatch({
      type: TASKS_ERROR,
      payload: "Error: No se puedo guardar la tarea: " + error.message
    });
  }
};

export const edit = editTask => async dispatch => {
  dispatch({
    type: TASKS_LOADING
  });
  try {
    const url = "https://jsonplaceholder.typicode.com/todos/"+editTask.id;
    const response = await axios.put(url, editTask);
    dispatch({
      type: TASKS_SAVE
    });
  } catch (error) {
    dispatch({
      type: TASKS_ERROR,
      payload: "Error: No se puedo guardar la tarea: " + error.message
    });
  }
};

export const taskDelete = taskId => async dispatch => {
  dispatch({
    type: TASKS_LOADING
  });
  try {
    const url = "https://jsonplaceholder.typicode.com/todos/"+taskId;
    const response = await axios.delete(url);
    dispatch({
      type: TASKS_LIST,
      payload: {}
    });
  } catch (error) {
    dispatch({
      type: TASKS_ERROR,
      payload: "Error: No se puedo eliminar la tarea: " + error.message
    });
  }
};
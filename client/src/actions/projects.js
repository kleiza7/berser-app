import { FETCH_ALL, CREATE, UPDATE, DELETE } from "../constants/actionTypes";
import * as api from "../api/index.js";
import alertify from "alertifyjs";

export const getProjects = () => async (dispatch) => {
  try {
    const { data } = await api.fetchProjects();

    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createProject = (project) => async (dispatch) => {
  try {
    const { data } = await api.createProject(project);

    dispatch({ type: CREATE, payload: data });
    alertify.alert("Succesful", "The project created successfully.");
  } catch (error) {
    alertify.alert("Error", "The project could not be created.");
  }
};

export const updateProject = (id, project) => async (dispatch) => {
  try {
    const { data } = await api.updateProject(id, project);
    dispatch({ type: UPDATE, payload: data });
    alertify.alert("Succesful", "The project uptaded successfully.");
  } catch (error) {
    alertify.alert("Error", "The project could not be updated.");
  }
};

export const deleteProject = (id) => async (dispatch) => {
  try {
    await api.deleteProject(id);

    dispatch({ type: DELETE, payload: id });
    alertify.alert("Successful", "The project deleted successfully.");
  } catch (error) {
    console.log(error);
  }
};

export const likeProject = (id) => async (dispatch) => {
  try {
    const { data } = await api.likeProject(id);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

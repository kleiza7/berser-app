import { AUTH, FORGOT } from "../constants/actionTypes";
import * as api from "../api/index.js";
import alertify from "alertifyjs";

export const signin = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });

    history.push("/");
  } catch (error) {
    alertify.alert("Error", "Email or password is incorrect.");
  }
};

export const signup = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });

    history.push("/");
  } catch (error) {
    alertify.alert("Error", "Please fill in the blanks.");
  }
};
export const forgotPassword = (formData) => async (dispatch) => {
  try {
    const { data } = await api.forgotPassword(formData);

    dispatch({ type: FORGOT, data });

    alertify.alert("Your e-mail has been sent successfully.");
  } catch (error) {
    alertify.alert("Lütfen geçerli mail giriniz.");
  }
};

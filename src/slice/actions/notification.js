import { clear_text, set_text } from "../notificationSlice";

export const setNotification = (text) => (dispatch) => {
  dispatch(set_text(text));
};

export const clearNotification = (text) => (dispatch) => {
  dispatch(clear_text(text));
};

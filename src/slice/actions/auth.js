import authService from "../../services/auth.service";
import {
  login_fail,
  login_successful,
  register_fail,
  register_successful,
  logout_reducer,
} from "../authSlice";

export const signup = (fullname, email, username, password) => (dispatch) => {
  return authService
    .signup(fullname, email, username, password)
    .then((response) => {
      dispatch(register_successful());
      return Promise.resolve();
    })
    .catch((error) => {
      dispatch(register_fail());
      return Promise.reject(error.response.data.message);
    });
};

export const login = (username, password) => (dispatch) => {
  return authService.login(username, password).then(
    (res) => {
      const id = res.id;
      dispatch(login_successful({ user: { id, username, password } }));

      return Promise.resolve();
    },
    (error) => {
      dispatch(login_fail());
      return Promise.reject(error.response.data.message);
    }
  );
};

export const logout = () => (dispatch) => {
  authService.logout();
  dispatch(logout_reducer());
};

import { createSlice } from "@reduxjs/toolkit";
import AuthService from "../services/auth.service";

const user = JSON.parse(localStorage.getItem("user"));

export const authSlice = createSlice({
  name: "user",

  initialState: user
    ? { isLoggedIn: true, user }
    : { isLoggedIn: false, user: null },

  reducers: {
    register_successful: (state, action) => {
      state.isLoggedIn = false;
    },

    register_fail: (state, action) => {
      state.isLoggedIn = false;
    },

    login_successful: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },

    login_fail: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },

    logout_reducer: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login_fail, login_successful, register_fail, register_successful, logout_reducer } = authSlice.actions;

export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

export const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    text: "",
  },
  reducers: {
    set_text: (state, action) => {
      state.text = action.payload;
    },
    clear_text: (state) => {
      state.text = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { set_text, clear_text } = notificationSlice.actions;

export default notificationSlice.reducer;

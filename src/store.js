// import { createStore, applyMiddleware } from "redux";
// import { composeWithDevTools } from "redux-devtools-extension";
// import thunk from "redux-thunk";
// import rootReducer from "./reducers";
// const middleware = [thunk];
// const store = createStore(
//   rootReducer,
//   composeWithDevTools(applyMiddleware(...middleware))
// );
// export default store;

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import notificationReducer from "./slice/notificationSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    notification: notificationReducer,
  },
});

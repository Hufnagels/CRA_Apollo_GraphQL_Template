import { configureStore } from "@reduxjs/toolkit";
import logger from 'redux-logger'

import userReducer from "../reducers/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(logger)
})
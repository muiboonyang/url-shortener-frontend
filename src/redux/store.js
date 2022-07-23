import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";

import userSlice from "./userSlice";
import renderSlice from "./renderSlice";
import loadingSlice from "./loadingSlice";

const reducers = combineReducers({
  user: userSlice,
  render: renderSlice,
  loading: loadingSlice,
});

////////////////////////////////

// To persist the store data even if user navigates away from the page
const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export default store;

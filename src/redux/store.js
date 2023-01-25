import { configureStore } from "@reduxjs/toolkit";
import bookMarkReducer from "./slices/bookMarkSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

const persistConfig = {
  key: "bookmark",
  storage,
};

const persistedReducer = persistReducer(persistConfig, bookMarkReducer);
export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export const persistor = persistStore(store);

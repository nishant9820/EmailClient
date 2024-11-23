import { configureStore } from "@reduxjs/toolkit";
import draftsReducer from "./slices/draftsSlice";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    drafts: draftsReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

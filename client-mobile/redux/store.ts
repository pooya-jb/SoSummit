import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import locationReducer from "./locationSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    location: locationReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
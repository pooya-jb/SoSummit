import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice.ts';
import displayReducer from './displaySlice.ts'

export const store = configureStore({
  reducer: {
    user: userReducer,
    display: displayReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice.ts';
import displayReducer from './displaySlice.ts'
import locationReducer from './locationSlice.ts'

export const store = configureStore({
  reducer: {
    user: userReducer,
    display: displayReducer,
    location: locationReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
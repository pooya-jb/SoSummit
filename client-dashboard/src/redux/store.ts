import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux'
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

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

export type RootState = ReturnType<typeof store.getState>
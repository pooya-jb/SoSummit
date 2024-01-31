import { PayloadAction, createSlice } from '@reduxjs/toolkit';
// import socket from '../socket';

const initialState = {
  // firstName: '',
  // lastName: '',
  isAuthenticated: false,
  isConnected : false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loggedIn: (state) => {
      return {
        ...state,
        isAuthenticated: true,
        // firstName: action.payload.firstName,
        // lastName: action.payload.lastName
      }
    },
    loggedOut: (state) => {
      return {
        ...state,
        isAuthenticated: false,
        // firstName: '',
        // lastName: '',
      }
    },
    reloaded: (state, action) => {
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        // firstName: action.payload.firstName,
        // lastName: action.payload.lastName,
      }
    },
    socketConnected: (state, action : PayloadAction<boolean>) => {
      return {
        ...state,
        isConnected: action.payload
      }
    },
  }
})

export default userSlice.reducer;

export const { loggedIn, loggedOut, reloaded, socketConnected } = userSlice.actions;

import { createSlice } from '@reduxjs/toolkit';
// loggedIn reducer not being used for now

const initialState = {
  firstName: '',
  lastName: '',
  isAuthenticated: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loggedIn: (state, action) => {
      return {
        ...state,
        isAuthenticated: true,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName
      }
    },
    loggedOut: () => {
      return {
        isAuthenticated: false,
        firstName: '',
        lastName: '',
      }
    },
    reloaded: (state, action) => {
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
      }
    }
  }
})

export default userSlice.reducer;

export const { loggedIn, loggedOut, reloaded } = userSlice.actions;

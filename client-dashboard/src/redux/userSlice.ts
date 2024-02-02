import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
  email: '',
  location: '',
  isAuthenticated: false,
  isConnected : false,
  locationIsConnected : false,
  adminLocationIsConnected : false
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
    locationConnected: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        locationIsConnected: action.payload
      }
    },
    adminLocationConnected: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        adminLocationIsConnected: action.payload
      }
    },
    setUsername: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        username: action.payload,
      };
    },
    setEmail: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        email: action.payload,
      };
    },
    setLocation: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        location: action.payload,
      };
    },
  }
})

export default userSlice.reducer;

export const { loggedIn, loggedOut, reloaded, socketConnected, locationConnected, adminLocationConnected, setEmail, setLocation, setUsername } = userSlice.actions;

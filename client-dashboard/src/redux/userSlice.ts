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
    loggedIn: (state, action) => {
      return {
        ...state,
        isAuthenticated: true,
        location: action.payload.userInfo.location,
        username: action.payload.userInfo.username,
        email: action.payload.userInfo.email,
        isConnected: true
      }
    },
    loggedOut: (state) => {
      return {
        ...state,
        isAuthenticated: false,
      }
    },
    reloaded: (state, action) => {
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
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

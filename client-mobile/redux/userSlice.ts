import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { tokenValidation } from '../utils/ApiService';
import { mapPosition } from '../utils/types';

const initialState = {
  username: '',
  email: '',
  bio: '',
  age: '',
  experience: '',
  isAuth: false,
  isConnected: false,
  location: '',
  isAdmin: false,
  tripStarted: false,
  userLocation : {
    latitude: 27.9881,
    longitude: 86.925,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  },
  mapRegion : {
    latitude: 27.9881,
    longitude: 86.925,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.isAuth = action.payload;
    },
    socketConnected: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isConnected: action.payload,
      };
    },
    setLocation: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        location: action.payload,
      };
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
    setAge: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        age: action.payload,
      };
    },
    setBio: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        bio: action.payload,
      };
    },
    setExperience: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        experience: action.payload,
      };
    },
    setAdmin: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isAdmin: action.payload,
      };
    },
    tripStarted: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        tripStarted: action.payload,
      };
    },
    userLocationUpdated : (state, action : PayloadAction<mapPosition>) => {
      return {
        ...state,
        userLocation : action.payload
      }
    },
    mapRegionUpdated: (state, action: PayloadAction<mapPosition>) => {
      return {
        ...state,
        mapRegion: action.payload
      }
    },
    loggedOut : (state) => {
      return initialState
    }
  },
});

export const {
  setAuth,
  socketConnected,
  setLocation,
  setUsername,
  setAge,
  setBio,
  setEmail,
  setExperience,
  setAdmin,
  tripStarted,
  userLocationUpdated,
  mapRegionUpdated,
  loggedOut
} = userSlice.actions;

export default userSlice.reducer;

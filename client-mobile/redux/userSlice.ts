import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { tokenValidation } from '../utils/ApiService';
import { mapPosition } from '../utils/types';

const initialState = {
  username: '',
  email: '',
  bio: '',
  phoneNumber: '',
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
    latitude: 52.50740142614877,
    longitude: 13.378497425905698,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  },
  userActiveAlert: false
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
    setPhoneNumber: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        phoneNumber: action.payload,
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
    },
    userLoggedIn : (state, action) => {
      return {
        ...state,
        username : action.payload.username,
        email: action.payload.email,
        phoneNumber: action.payload.phoneNumber,
        bio: action.payload.bio,
        experience: action.payload.experience,
        isAuth: true,
        isAdmin: false
      }
    },
    adminLoggedIn: (state, action) => {
      return {
        ...state,
        username: action.payload.username,
        location: action.payload.location,
        email: action.payload.email,
        isAuth: true,
        isAdmin : true
      }
    },
    setActiveAlert: (state, action) => {
      return {
        ...state,
        userActiveAlert: action.payload
      }
    }
  },
});

export const {
  setAuth,
  socketConnected,
  setLocation,
  setUsername,
  setPhoneNumber,
  setBio,
  setEmail,
  setExperience,
  setAdmin,
  tripStarted,
  userLocationUpdated,
  mapRegionUpdated,
  loggedOut,
  userLoggedIn,
  adminLoggedIn,
  setActiveAlert
} = userSlice.actions;

export default userSlice.reducer;

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { tokenValidation } from '../utils/ApiService';

const initialState = {
  username: '',
  email:'',
  bio:'',
  age:'',
  experience: '',
  isAuth: false,
  isConnected: false,
  location: '',
  coords: [0],
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
    setCoords: (state, action: PayloadAction<number[]>) => {
      return {
        ...state,
        coords: action.payload,
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
  },
});

export const { setAuth, socketConnected, setLocation, setCoords, setUsername, setAge, setBio, setEmail, setExperience } =
  userSlice.actions;

export default userSlice.reducer;

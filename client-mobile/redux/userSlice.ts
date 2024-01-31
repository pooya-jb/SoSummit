import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { tokenValidation } from "../utils/AppService";

const initialState = {
  isAuth: false,
  isConnected : false,
  location: '',
  coords: []
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.isAuth = action.payload
    },
    socketConnected: (state, action : PayloadAction<boolean>) => {
      return {
        ...state,
        isConnected: action.payload
      }
    },
    setLocation: (state, action : PayloadAction<string>) => {
      return {
        ...state,
        location: action.payload
      }
    },
    setCoords: (state, action : PayloadAction<[]>) => {
      return {
        ...state,
        coords: action.payload
      }
    },
  }
})

export const {
  setAuth,
  socketConnected,
  setLocation,
  setCoords
} = userSlice.actions

export default userSlice.reducer
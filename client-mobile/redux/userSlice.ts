import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.isAuth = action.payload
    }
  }
})

export const {
  setAuth
} = userSlice.actions

export default userSlice.reducer
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DisplayS } from '../types';
// loggedIn reducer not being used for now


const initialState : DisplayS= {
  drawerIsOpen : false,
  selectedUser : null
};

export const displaySlice = createSlice({
  name: 'display',
  initialState,
  reducers: {
    drawerToggled : (state : DisplayS) => {
      return {
        ...state,
        drawerIsOpen : !state.drawerIsOpen
      }
    }
  }
})

export default displaySlice.reducer;

export const {drawerToggled} = displaySlice.actions;
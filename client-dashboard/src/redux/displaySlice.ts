import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DisplayS, UserL } from '../types';
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
    },
    userSelected : (state : DisplayS, action: PayloadAction<UserL>) => {
      return {
        ...state,
        drawerIsOpen : true,
        selectedUser: action.payload
      }
    }
  }
})

export default displaySlice.reducer;

export const {drawerToggled, userSelected} = displaySlice.actions;
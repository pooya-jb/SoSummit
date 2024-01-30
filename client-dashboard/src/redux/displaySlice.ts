import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DisplayS, UserL } from '../types';


const initialState : DisplayS= {
  drawerIsOpen : false,
  selectedUser : null,
  loginModalOpen : false
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
    },
    loginSelected : (state: DisplayS) => {
      return {
        ... state,
        loginModalOpen : !state.loginModalOpen
      }
    }
  }
})

export default displaySlice.reducer;

export const {drawerToggled, userSelected, loginSelected} = displaySlice.actions;
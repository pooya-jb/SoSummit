import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DisplayS } from '../types';


const initialState : DisplayS= {
  drawerIsOpen : false,
  selectedUser : null,
  loginModalOpen : false,
  registerModalOpen: false,
  alertModalOpen: false,
  locationRegisterModalOpen : false
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
    userSelected : (state : DisplayS, action: PayloadAction<string>) => {
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
    },
    registerSelected : (state: DisplayS) => {
      return {
        ... state,
        registerModalOpen : !state.registerModalOpen
      }
    },
    locationRegisterSelected: (state: DisplayS) => {
      return {
        ...state,
        locationRegisterModalOpen: !state.locationRegisterModalOpen
      }
    },
    alertSelected : (state: DisplayS) => {
      return {
        ... state,
        alertModalOpen : !state.alertModalOpen
      }
    }
  }
})

export default displaySlice.reducer;

export const {drawerToggled, userSelected, loginSelected, registerSelected, alertSelected, locationRegisterSelected} = displaySlice.actions;
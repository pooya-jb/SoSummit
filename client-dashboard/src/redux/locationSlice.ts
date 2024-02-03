import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ActiveAdminS, AlertS, LocationS, UserL } from '../types';
import { RootState } from './store';
// const userMock: UserL[] = [
//   {
//     username: 'greg',
//     email: 'greg@mail',
//     age: '12',
//     experience: 'expert',
//     bio: 'i am greg',
//     location: 'botswana ski resort',
//   },
//   {
//     username: 'jack',
//     email: 'greg@mail',
//     age: '12',
//     experience: 'expert',
//     bio: 'i am greg',
//     location: 'botswana ski resort',
//   },
// ];
// const adminMock: UserL[] = [
//   {
//     username: 'Bob',
//     email: 'greg@mail',
//     age: '12',
//     experience: 'expert',
//     bio: 'i am greg',
//     location: 'botswana ski resort',
//   },
//   {
//     username: 'jack',
//     email: 'greg@mail',
//     age: '12',
//     experience: 'expert',
//     bio: 'i am greg',
//     location: 'botswana ski resort',
//   },
// ];

const initialState: LocationS = {
  name: '',
  coordinates: [],
  alerts: [],
  activeAdmins: [],
  admins: [],
};

export const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    activeAdminUpdate: (
      state: RootState,
      action: PayloadAction<ActiveAdminS>
    ) => {
      return {
        ...state,
        activeAdmins: state.activeAdmins.forEach((admin: ActiveAdminS) => {
          if (admin.username === action.payload.username)
            admin.coords = action.payload.coords;
        }),
      };
    },

    activeAdminEntered: (
      state: LocationS,
      action: PayloadAction<ActiveAdminS>
    ) => {
      return {
        ...state,
        activeAdmins: [...state.activeAdmins, action.payload],
      };
    },

    activeAdminLeft: (state: LocationS, action: PayloadAction<UserL>) => {
      return {
        ...state,
        users: state.activeAdmins.filter((user) => user !== action.payload),
      };
    },

    adminEntered: (state: LocationS, action: PayloadAction<string>) => {
      return {
        ...state,
        admins: [...state.admins, action.payload],
      };
    },

    adminLeft: (state: LocationS, action: PayloadAction<string>) => {
      return {
        ...state,
        admins: state.admins.filter((admin) => admin !== action.payload),
      };
    },
    updateAlerts: (state: LocationS, action: PayloadAction<AlertS>) => {
      return {
        ...state,
        alerts: [...state.alerts, ...action.payload],
      };
    },

    updateAdmins: (state: LocationS, action: PayloadAction<string[]>) => {
      return {
        ...state,
        admins: action.payload,
      };
    },
    updateActiveAdmins: (
      state: LocationS,
      action: PayloadAction<ActiveAdminS[]>
    ) => {
      return {
        ...state,
        activeAdmins: action.payload,
      };
    },
  },
});

export default locationSlice.reducer;

export const {
  activeAdminUpdate,
  activeAdminEntered,
  activeAdminLeft,
  adminEntered,
  adminLeft,
  updateAlerts,
  updateActiveAdmins,
  updateAdmins,
} = locationSlice.actions;

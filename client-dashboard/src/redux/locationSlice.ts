import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ActiveAdminS, AlertS, LocationS, NotificationS, UserL } from '../types';
import { RootState } from './store';
import { act } from 'react-dom/test-utils';

const initialState: LocationS = {
  name: '',
  coordinates: [],
  alerts: [],
  activeAdmins: [],
  admins: [],
  displayCoords: [],
  noots: []
};

export const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    activeAdminUpdate: (
      state,
      action: PayloadAction<ActiveAdminS>
    ) => {
      console.log(action.payload)
      return {
        ...state,
        activeAdmins: state.activeAdmins.map((admin: ActiveAdminS) => {
        if (admin.username !== action.payload.userName) {
          return admin
        } else {
          return {...admin, coords: action.payload.coords}
        }
        }),
      };
    },

    activeAdminEntered: (
      state: LocationS,
      action: PayloadAction<any>
    ) => {
      return {
        ...state,
        activeAdmins: [...state.activeAdmins, {
          username: action.payload,
        coords: [0,0]}],
      };
    },

    activeAdminLeft: (state: LocationS, action: PayloadAction<any>) => {
      return {
        ...state,
        activeAdmins: state.activeAdmins.filter((user) => user.username !== action.payload),
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
    updateAlerts: (state: LocationS, action: PayloadAction<AlertS[]>) => {
      return {
        ...state,
        alerts: action.payload
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
      action: PayloadAction<string[]>
    ) => {
      console.log(action)
      return {
        ...state,
        activeAdmins: action.payload.map((admin) => {
          return {
            username: admin,
            coords: [0, 0]
          }
        })
      };
    },

    updateCoords: (state: LocationS, action: PayloadAction<number[]>) => {
      return {
        ...state,
        coordinates: action.payload,
        displayCoords: [(action.payload[1] + action.payload[0]) / 2, (action.payload[3] + action.payload[2]) / 2]
      }
    },
    addAlert: (state: LocationS, action: PayloadAction<AlertS>) => {
      if (!state.alerts.some(alert => alert.username === action.payload.username)) {

        return {
          ...state,
          alerts: [...state.alerts, action.payload]
        };
      } else return state
    },
    addNoot: (state: LocationS, action: PayloadAction<AlertS>) => {

        return {
          ...state,
          noots: [...state.noots, action.payload]
        };
    },
    updateNoots: (state: LocationS, action: PayloadAction<NotificationS[]>) => {
        return {
          ...state,
          noots:  action.payload
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
  updateCoords,
  addAlert,
  addNoot,
  updateNoots

} = locationSlice.actions;

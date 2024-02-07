import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { INotification, IAlert } from '../utils/types';

const initialState = {
  locations: [''],
  notifications: [{_id: "asdfasdfasdf", text: "asdf", time: "asdf", type: "asdf"}],
  alerts : [{_id : "sfjefkemfksmf", time : "help!", type : "red", username: "oh god", location : [17,62]}],
  phoneNumber: '0'
};

export const locationSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {
    updateLocations: (state, action: PayloadAction<string[]>) => {
      return {
        ...state,
        locations: action.payload,
      };
    },
    updateNotifications: (state, action: PayloadAction<INotification[]>) => {
      return {
        ...state,
        notifications: action.payload
      }
    },
    addNotification: (state, action: PayloadAction<INotification>) => {
      return {
        ... state,
        notifications: [...state.notifications, action.payload]
      }
    },
    updateAlerts: (state, action: PayloadAction<IAlert[]>) => {
      return {
        ...state,
        alerts: action.payload
      }
    },
    addAlert: (state, action: PayloadAction<IAlert>) => {
      return {
        ...state,
        alerts: [...state.alerts, action.payload]
      }
    },
    setPhoneNumber: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        phoneNumber: action.payload
      }
    }
  },
});

export const { updateLocations, updateNotifications, addNotification, updateAlerts, addAlert, setPhoneNumber } = locationSlice.actions;

export default locationSlice.reducer;

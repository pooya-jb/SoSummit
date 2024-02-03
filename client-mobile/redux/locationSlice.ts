import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { INotification } from '../utils/types';

const initialState = {
  locations: [''],
  notifications: [{_id: "asdfasdfasdf", text: "asdf", time: "asdf", type: "asdf"}]
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
    }
  },
});

export const { updateLocations, updateNotifications, addNotification } = locationSlice.actions;

export default locationSlice.reducer;

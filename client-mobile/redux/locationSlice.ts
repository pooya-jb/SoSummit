import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
  locations: [''],
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
  },
});

export const { updateLocations } = locationSlice.actions;

export default locationSlice.reducer;

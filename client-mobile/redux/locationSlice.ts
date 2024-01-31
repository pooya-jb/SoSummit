import { createSlice } from "@reduxjs/toolkit";
import { fetchLocations } from "../utils/AppService";

// const initialLocations = fetchLocations()
const initialLocations = [
  {name: 'Zermatt'}, 
  {name: 'Ordino'}, 
  {name: 'Pal Arinsal'}, 
  {name: 'Gran Balira'}, 
  {name: 'Boi taull'} 
]

const initialState = {
  locations: initialLocations
}



export const locationSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {}
})

export default locationSlice.reducer
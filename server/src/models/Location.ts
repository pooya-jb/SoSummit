import {Schema, model} from 'mongoose'
import { ILocation } from '../types';

const LocationSchema = new Schema<ILocation> ({
  name: {
    type: String,
    required: true
  },
  coordinates: [Number],
  alerts: [{
    text: {
      type: String,
      required: true
    },
    time: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    location:{
      type: [Number],
      required: true
    }
  }]
  
})

const Location = model<ILocation>('Location', LocationSchema);

export default Location;
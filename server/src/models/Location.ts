import db from './index';
import { ILocation } from '../types';

const LocationSchema = new db.Schema<ILocation> ({
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

const Location = db.model<ILocation>('Location', LocationSchema);

export default Location;
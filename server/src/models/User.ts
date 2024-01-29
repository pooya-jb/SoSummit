import {Schema, model} from 'mongoose'
import { IUser } from '../types';
const UserSchema = new Schema<IUser> ({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  age:{
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  location: {
    type: String
  }
  
})

const User = model<IUser>('User', UserSchema);

export default User;
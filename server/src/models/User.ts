import db from './index';
import { IUser } from '../types';
const UserSchema = new db.Schema<IUser> ({
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
  phoneNumber:{
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
  },
  activeAlert: {
    type: Boolean
  }
})

const User = db.model<IUser>('User', UserSchema);

export default User;
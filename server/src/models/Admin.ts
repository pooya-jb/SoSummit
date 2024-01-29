import {Schema, model} from 'mongoose'
import { IAdmin } from '../types';
const AdminSchema = new Schema<IAdmin> ({
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
  location: {
    type: String
  }
  
})

const Admin = model<IAdmin>('Admin', AdminSchema);

export default Admin;
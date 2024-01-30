import db from './index'
import { IAdmin } from '../types';
const AdminSchema = new db.Schema<IAdmin> ({
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

const Admin = db.model<IAdmin>('Admin', AdminSchema);

export default Admin;
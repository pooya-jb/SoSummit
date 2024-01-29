import bcrypt from 'bcrypt';
import Admin from './../models/Admin';
import { IAdminModel, TypedRequest, IAdmin } from '../types';
import { Response } from 'express';
import jwt from 'jsonwebtoken'
const SECRET_KEY = process.env.SECRET_KEY || 'lalala this isnt secure';


const createAdmin = async (req : TypedRequest<IAdmin>, res : Response) => {
  const { email, password } : {email : string, password : string} = req.body;
  const user : InstanceType<IAdminModel> | null= await Admin.findOne({ email: email });
  if (user)
    return res
      .status(409)
      .send({ error: '409', message: 'Admin already exists' });
  try {
    if (password === '') throw new Error();
    const hash : string = await bcrypt.hash(password, 10);
    const newAdmin: InstanceType<IAdminModel> = new Admin({
      ...req.body,
      password: hash,
    });
    const user: InstanceType<IAdminModel> = await newAdmin.save();
    const accessToken = jwt.sign({_id: user._id }, SECRET_KEY);
    res.status(201).send({ accessToken });
  } catch (error) {
    res.status(400).send({ error, message: 'Could not create user' });
  }
};

const loginAdmin = async (req : TypedRequest<IAdmin>, res : Response) => {
  const { email, password } = req.body;
  try {
    const user: InstanceType<IAdminModel> | null = await Admin.findOne({ email: email });
    if (!user) throw Error()
    const validatedPass: boolean = await bcrypt.compare(password, user.password);
    if (!validatedPass) throw new Error();
    const accessToken: string = jwt.sign({ _id: user._id }, SECRET_KEY);
    res.status(200).send({ accessToken });
  } catch (error) {
    res
      .status(401)
      .send({ error: '401', message: 'Username or password is incorrect' });
  }
  
};
// const profile = async (req, res) => {
// 
//   try {
//     const { _id, firstName, lastName } = req.user;
//     const user = { _id, firstName, lastName };
//     res.status(200).send(user);
//   } catch {
//     res.status(404).send({ error, message: 'Resource not found' });
//   }
//   
// };
// const logout = (req, res) => {
//   // delete the token client side upon logout.
//   // you would invalidate the token here.
// };



export default {createAdmin, loginAdmin}
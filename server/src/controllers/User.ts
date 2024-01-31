import bcrypt from 'bcrypt';
import User from './../models/User';
import { IUserModel, TypedRequest, IUser } from '../types';
import { Response } from 'express';
import jwt from 'jsonwebtoken'
const SECRET_KEY = process.env.SECRET_KEY || 'lalala this isnt secure';


const createUser = async (req : TypedRequest<IUser>, res : Response) => {
  const { email, password } : {email : string, password : string} = req.body;
  const user : InstanceType<IUserModel> | null= await User.findOne({ email: email });
  if (user)
    return res
      .status(409)
      .send({ error: '409', message: 'User already exists' });
  try {
    if (password === '') throw new Error();
    const hash : string = await bcrypt.hash(password, 10);
    const newUser: InstanceType<IUserModel> = new User({
      ...req.body,
      password: hash,
    });
    const user: InstanceType<IUserModel> = await newUser.save();
    const accessToken = jwt.sign({_id: user._id }, SECRET_KEY);
    res.status(201).send({ accessToken });
  } catch (error) {
    res.status(400).send({ error, message: 'Could not create user' });
  }
};

const loginUser = async (req : TypedRequest<IUser>, res : Response) => {
  const { email, password } = req.body;
  try {
    const user: InstanceType<IUserModel> | null = await User.findOne({ email: email });
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

}

export default {createUser, loginUser}
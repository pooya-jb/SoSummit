import bcrypt from 'bcrypt';
import User from './../models/User';
import Admin from './../models/Admin';
import { IAdminModel, IUserModel, TypedSessionRequest, IUser, IAdmin } from '../types';
import { ObjectId } from 'mongoose';
import { Response } from 'express';

const createUser = async (req : TypedSessionRequest<IUser>, res : Response) => {
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
    req.session = {uid : user._id as unknown as ObjectId};
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send({ error, message: 'Could not create user' });
  }
};

const createAdmin = async (req: TypedSessionRequest<IAdmin>, res: Response) => {
  const { email, password }: { email: string, password: string } = req.body;
  const user: InstanceType<IAdminModel> | null = await Admin.findOne({ email: email });
  if (user)
    return res
      .status(409)
      .send({ error: '409', message: 'User already exists' });
  try {
    if (password === '') throw new Error();
    const hash: string = await bcrypt.hash(password, 10);
    const newUser: InstanceType<IAdminModel> = new Admin({
      ...req.body,
      password: hash,
    });
    const user: InstanceType<IAdminModel> = await newUser.save();
    req.session = { uid: user._id as unknown as ObjectId };
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send({ error, message: 'Could not create user' });
  }
};
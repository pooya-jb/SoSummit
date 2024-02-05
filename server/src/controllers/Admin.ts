import bcrypt from 'bcrypt';
import Admin from './../models/Admin';
import { IAdminModel, TypedRequest, IAdmin, ILocationModel } from '../types';
import { Response } from 'express';
import jwt from 'jsonwebtoken';
import Location from '../models/Location';
const SECRET_KEY = process.env.SECRET_KEY || 'lalala this isnt secure';

const createAdmin = async (req: TypedRequest<IAdmin>, res: Response) => {
  // Maybe JWT TOKENS AND INFO WILL NOT BE SENT DEPENDING ON REGISTRATION PROCESS
  const { email, password }: { email: string; password: string } = req.body;
  const user: InstanceType<IAdminModel> | null = await Admin.findOne({
    email: email,
  });
  if (user)
    return res
      .status(409)
      .send({ error: '409', message: 'Admin already exists' });
  try {
    if (password === '') throw new Error();
    const hash: string = await bcrypt.hash(password, 10);
    const newAdmin: InstanceType<IAdminModel> = new Admin({
      ...req.body,
      password: hash,
    });
    const user: InstanceType<IAdminModel> = await newAdmin.save();
    const { username, location: adminLocation } = user;
    const locationInstance: InstanceType<ILocationModel> | null =
      await Location.findOne({ name: adminLocation });
    if (locationInstance) {
      locationInstance.admins.push(username);
      await Location.findOneAndUpdate(
        { name: adminLocation },
        { admins: locationInstance.admins }
      );
      res.status(201);
    } else throw Error();
  } catch (error) {
    res.status(400).send({ error, message: 'Could not create user' });
  }
};

const loginAdmin = async (req: TypedRequest<IAdmin>, res: Response) => {
  const { email, password } = req.body;
  try {
    const user: InstanceType<IAdminModel> | null = await Admin.findOne({
      email: email,
    });
    if (!user) throw Error();
    const validatedPass: boolean = await bcrypt.compare(
      password,
      user.password
    );
    if (!validatedPass) throw new Error();
    const accessToken: string = jwt.sign({ _id: user._id }, SECRET_KEY);
    const { username, location } = user;
    // Admin list missing. WILL NEED MAYBE
    const locationInstance: InstanceType<ILocationModel> | null =
    await Location.findOne({ name: location });
    const admins = await Admin.find({location})
    const adminsUsernames: string[] = []
    admins.forEach(admin => adminsUsernames.push(admin.username))
    if (locationInstance) {
      const { alerts, notifications, activeAdmins, coordinates } = locationInstance;
      res.status(200).send({
        accessToken,
        userInfo: { username, location, email },
        locationInfo: { alerts, notifications, activeAdmins, admins: adminsUsernames, coordinates },
      });
    } else throw Error();
  } catch (error) {
    res
      .status(401)
      .send({ error: '401', message: 'Username or password is incorrect' });
  }
};

const deleteNoot = async (req: TypedRequest<{time:string, location:string}>, res: Response) => {
  console.log('fired');
  const { time, location } = req.body;
  console.log(time, location)
  try {
    const locationFetched = await Location.findOne({ name: location });
    if(!locationFetched) throw Error() 
    const newNoots = locationFetched.notifications.filter(noot => noot.time !== time)
      await Location.findOneAndUpdate({ name: location }, { notifications: newNoots });
      res.status(200).send();
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

export default { createAdmin, loginAdmin, deleteNoot };

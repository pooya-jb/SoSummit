import bcrypt from 'bcrypt'

import { ILocationModel } from "../types";
import Location from './../models/Location';
import { Response } from 'express'
import { IAdminModel } from "../types";
import Admin from '../models/Admin';
import { setUpNewLocation, io } from '../socket';

async function getAllLocations(req: Request, res: Response) {
  try {
    const locations: InstanceType<ILocationModel>[] = await Location.find();
    res.status(200).send({ locations: locations.map(location => location.name) });
  } catch (error) {
    res.status(500).send({ error, message: 'Internal Server Error' });
  }
}

async function getAllLocationsBoot() : Promise<string[] | false> {
  try {
    const locations: InstanceType<ILocationModel>[] = await Location.find();
    return locations.map(location => location.name);
  } catch (error) {
    return false;
  }
}
const createLocation = async (req : any, res: Response) => {
  // Maybe JWT TOKENS AND INFO WILL NOT BE SENT DEPENDING ON REGISTRATION PROCESS
  const { email, password, username, locationName, locationCoordinates, phoneNumber } = req.body;
  const user: InstanceType<IAdminModel> | null = await Admin.findOne({
    email: email,
  });

  const location: InstanceType<IAdminModel> | null = await Location.findOne({
    name : locationName,
  });

  if (user)
    return res
      .status(409)
      .send({ error: '409', message: 'Admin already exists' });


  if (location)
    return res
      .status(409)
      .send({ error: '409', message: 'Location already exists' });

  try {
    if (password === '') throw new Error();
    const hash: string = await bcrypt.hash(password, 10);
    const newAdmin: InstanceType<IAdminModel> = new Admin({
      email,
      username,
      location : locationName,
      password: hash,
    });

    const newLocation =  new Location ({
      name : locationName,
      coordinates: locationCoordinates,
      admins : [username],
      alerts : [],
      notifications : [],
      activeAdmins : [],
      phoneNumber 
    })

    const user: InstanceType<IAdminModel> = await newAdmin.save();

    const location: InstanceType<ILocationModel> = await newLocation.save()

    setUpNewLocation(io, locationName);

    res.status(201).send();
  } catch (error) {
    res.status(400).send({ error, message: 'Could not create admin and location' });
  }
};
export default { getAllLocations, getAllLocationsBoot, createLocation }
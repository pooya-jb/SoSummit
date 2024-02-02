import { ILocationModel } from "../types";
import Location from './../models/Location';
import { Response } from 'express'

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
export default { getAllLocations, getAllLocationsBoot }
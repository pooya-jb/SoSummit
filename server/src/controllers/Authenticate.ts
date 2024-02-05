import {
  IAdminModel,
  ILocationModel,
  IUserModel,
  TypedRequest,
} from '../types';
import Location from './../models/Location';
import { Response } from 'express';
import Admin from '../models/Admin';

async function getUserInfo(req: TypedRequest<boolean>, res: Response) {
  if (req.body === false) {
    try {
      const { username, age, experience, bio, email } =
        req.user as InstanceType<IUserModel>;
      const locations: InstanceType<ILocationModel>[] = await Location.find();
      console.log({
        userInfo: { username, email, age, experience, bio },
        locations: locations.map((location) => location.name),
      });
      res.status(200).send({
        userInfo: { username, email, age, experience, bio },
        locations: locations.map((location) => location.name),
      });
    } catch (error) {
      res.status(500).send({ error: '500', message: 'Internal Server Error' });
    }
  } else if (req.body === true) {
    try {
      const { username, location, email } =
        req.user as InstanceType<IAdminModel>;

      const locationInstance: InstanceType<ILocationModel> | null =
        await Location.findOne({ name: location });
      if (locationInstance) {
        const admins = await Admin.find({location})
        const adminsUsernames: string[] = []
        admins.forEach(admin => adminsUsernames.push(admin.username))
        const { alerts, notifications, activeAdmins, coordinates } =
          locationInstance;
        console.log({
          userInfo: { username, location, email },
          locationInfo: { alerts, notifications, activeAdmins, adminsUsernames, coordinates },
        });
        res.status(200).send({
          userInfo: { username, location, email },
          locationInfo: { alerts, notifications, activeAdmins, admins: adminsUsernames,coordinates },
        });
      }
    } catch (error) {
      res.status(500).send({ error: '500', message: 'Internal Server Error' });
    }
  }
}

export default { getUserInfo };

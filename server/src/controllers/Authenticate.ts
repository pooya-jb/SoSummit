import {
  IAdminModel,
  ILocationModel,
  IUserModel,
  TypedRequest,
} from '../types';
import Location from './../models/Location';
import { Response } from 'express';
import Admin from '../models/Admin';

async function getUserInfo(req: TypedRequest<'user' | 'admin'>, res: Response) {
  if (req.body === 'user') {
    try {
      const { username, phoneNumber, experience, bio, email, activeAlert } =
        req.user as InstanceType<IUserModel>;
      const locations: InstanceType<ILocationModel>[] = await Location.find();
      res.status(200).send({
        userInfo: { username, email, phoneNumber, experience, bio, activeAlert },
        locations: locations.map((location) => location.name),
      });
    } catch (error) {
      res.status(500).send({ error: '500', message: 'Internal Server Error' });
    }
  } else if (req.body === 'admin') {
    try {
      const { username, location, email } =
        req.user as InstanceType<IAdminModel>;

      const locationInstance: InstanceType<ILocationModel> | null =
        await Location.findOne({ name: location });
      if (locationInstance) {
        const admins = await Admin.find({location})
        const adminsUsernames: string[] = []
        admins.forEach(admin => adminsUsernames.push(admin.username))
        const { alerts, notifications, activeAdmins, coordinates, phoneNumber } =
          locationInstance;
        res.status(200).send({
          userInfo: { username, location, email },
          locationInfo: { alerts, notifications, activeAdmins, admins: adminsUsernames, coordinates, phoneNumber },
        });
      }
    } catch (error) {
      res.status(500).send({ error: '500', message: 'Internal Server Error' });
    }
  }
}

export default { getUserInfo };

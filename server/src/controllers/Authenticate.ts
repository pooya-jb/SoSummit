import {
  IAdminModel,
  ILocationModel,
  IUserModel,
  TypedRequest,
} from '../types';
import Location from './../models/Location';
import { Response } from 'express';

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
        const { alerts, notifications, activeAdmins, admins, coordinates } =
          locationInstance;
        console.log({
          userInfo: { username, location, email },
          locationInfo: { alerts, notifications, activeAdmins, admins, coordinates },
        });
        res.status(200).send({
          userInfo: { username, location, email },
          locationInfo: { alerts, notifications, activeAdmins, admins,coordinates },
        });
      }
    } catch (error) {
      res.status(500).send({ error: '500', message: 'Internal Server Error' });
    }
  }
}

export default { getUserInfo };

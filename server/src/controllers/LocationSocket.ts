import Location from '../models/Location';
import User from '../models/User';
import { ILocationModel, ISocketControllerResponse } from '../types';

async function checkCoordinates(
  locationName: string,
  userLocation: number[]
): Promise<ISocketControllerResponse> {
  try {
    const location: InstanceType<ILocationModel> | null =
      await Location.findOne({ name: locationName });
    if (location) {
      const [xMin, xMax, yMin, yMax] = location.coordinates;
      const [xUser, yUser] = userLocation;

      return xUser > xMin && xUser < xMax && yUser > yMin && yUser < yMax
        ? {
            status: true,
            info: {
              notifications: location.notifications,
              location: locationName,
              phoneNumber: location.phoneNumber
            },
          }
        : { status: false, info: undefined };
    } else return { status: false, info: undefined };
  } catch (err) {
    console.log(err);
    return { status: false, info: undefined };
  }
}

async function getAlertsAndNotifications(
  locationName: string
): Promise<ISocketControllerResponse> {
  try {
    const location: InstanceType<ILocationModel> | null =
      await Location.findOne({ name: locationName });
    return location
      ? {
          status: true,
          info: {
            notifications: location.notifications,
            alerts: location.alerts,
          },
        }
      : { status: false, info: undefined };
  } catch (err) {
    console.log(err);
    return { status: false, info: undefined };
  }
}

async function addAlert(
  locationName: string,
  userCoords: number[],
  helpType: string,
  username: string
): Promise<ISocketControllerResponse> {
  try {
    const location: InstanceType<ILocationModel> | null =
      await Location.findOne({ name: locationName });
    if (location) {
      const alert = {
        username,
        time: `${new Date().getTime()}`,
        type: helpType,
        location: userCoords,
      };
      const alerts = location.alerts.concat([alert]);
      await Location.findOneAndUpdate({ name: locationName }, { alerts });      
      const user = await User.findOne({username})
      if(user) await User.findOneAndUpdate({username},{activeAlert: true})
      else return { status: false, info: undefined };
      return { status: true, info: alert };
    } else return { status: false, info: undefined };
  } catch (err) {
    console.log(err);
    return { status: false, info: undefined };
  }
}

async function addNotification(
  locationName: string,
  type: string,
  text: string
): Promise<ISocketControllerResponse> {
  try {
    const location: InstanceType<ILocationModel> | null =
      await Location.findOne({ name: locationName });
    if (location) {
      const notification = {
        text,
        time: `${new Date().getTime()}`,
        type,
      };
      const notifications = location.notifications.concat([notification]);
      await Location.findOneAndUpdate(
        { name: locationName },
        { notifications }
      );
      return { status: true, info: notification };
    } else return { status: false, info: undefined };
  } catch (err) {
    console.log(err);
    return { status: false, info: undefined };
  }
}
async function addActiveAdmin(
  locationName: string,
  userName: string
): Promise<ISocketControllerResponse> {
  try {
    const location: InstanceType<ILocationModel> | null =
      await Location.findOne({ name: locationName });
    if (location) {
      if(!location.activeAdmins.some(admin => admin === userName)) {
        const activeAdmins = location.activeAdmins.concat([userName]);
        await Location.findOneAndUpdate({ name: locationName }, { activeAdmins });
      }
      return { status: true, info: { userName, alerts: location.alerts, notifications: location.notifications, location: locationName } };
    } else return { status: false, info: undefined };
  } catch (err) {
    console.log(err);
    return { status: false, info: undefined };
  }
}

async function removeActiveAdmin(
  locationName: string,
  userName: string
): Promise<ISocketControllerResponse> {
  try {
    const location: InstanceType<ILocationModel> | null =
      await Location.findOne({ name: locationName });
    if (location) {
      const activeAdmins = location.activeAdmins.filter(
        (user) => user !== userName
      );
      await Location.findOneAndUpdate({ name: locationName }, { activeAdmins });
      return { status: true, info: { userName } };
    } else return { status: false, info: undefined };
  } catch (err) {
    console.log(err);
    return { status: false, info: undefined };
  }
}

async function deleteAlert(
  userName: string,
  locationName:string
): Promise<ISocketControllerResponse> {
  try {
    const location: InstanceType<ILocationModel> | null =
      await Location.findOne({ name: locationName });
    if (location) {
      const newAlerts = location.alerts.filter(
        (alert) => alert.username !== userName
      );
      await Location.findOneAndUpdate({ name: locationName }, { alerts: newAlerts });
      return { status: true, info: { userName } };
    } else return { status: false, info: undefined };
  } catch (err) {
    console.log(err);
    return { status: false, info: undefined };
  }
}

async function deleteNoots(
  locationName:string
): Promise<ISocketControllerResponse> {
  try {
    const location: InstanceType<ILocationModel> | null =
      await Location.findOne({ name: locationName });
    if (location) {
      await Location.findOneAndUpdate({ name: locationName }, { notifications: [] });
      return { status: true, info: { location } };
    } else return { status: false, info: undefined };
  } catch (err) {
    console.log(err);
    return { status: false, info: undefined };
  }
}

export default {
  checkCoordinates,
  getAlertsAndNotifications,
  addAlert,
  addNotification,
  addActiveAdmin,
  removeActiveAdmin,
  deleteAlert,
  deleteNoots
};

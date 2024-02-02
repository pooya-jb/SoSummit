import Location from "../models/Location";
import { ILocationModel, ISocketControllerResponse } from "../types";

async function checkCoordinates (locationName : string, userLocation : number[]) : Promise <ISocketControllerResponse> {
  try {
    const location : InstanceType<ILocationModel> | null = await Location.findOne({name : locationName })
    if (location) {
      const [xMin, xMax, yMin, yMax] = location.coordinates;
      const [xUser, yUser] = userLocation;
   
      return xUser > xMin && xUser < xMax && yUser > yMin && yUser < yMax ?
        { status : true, info: {notifications : location.notifications}} : 
        { status : false, info: undefined };
    } else return { status: false, info: undefined };
  } catch (err) {
    console.log(err)
    return { status: false, info: undefined };
  }
}

async function getAlertsAndNotifications(locationName: string): Promise<ISocketControllerResponse> {
  try {
    const location: InstanceType<ILocationModel> | null = await Location.findOne({ name: locationName })
    return location ? { status: true, info: { notifications: location.notifications, alerts: location.alerts } } : { status: false, info: undefined };

  } catch (err) {
    console.log(err);
    return { status: false, info: undefined };
  }
}


async function addAlert(locationName: string, userCoords: number[], helpType: string, username: string) : Promise<ISocketControllerResponse> {
  try {
    const location: InstanceType<ILocationModel> | null = await Location.findOne({ name: locationName });
    if (location) {
      const alert = {
        username,
        time: `${new Date().getTime()}`,
        type: helpType,
        location: userCoords
      }
      const alerts = location.alerts.concat([alert]);
      await Location.findOneAndUpdate({ name: locationName }, { alerts});
      return { status: true , info : alert};
    }
    else return { status: false, info: undefined };

  } catch (err) {
    console.log(err);
    return { status: false, info: undefined };
  }
}

// async function addNotification(locationName: string, type: string, text: string): Promise<ISocketControllerResponse> {
//   try {
//     const location: InstanceType<ILocationModel> | null = await Location.findOne({ name: locationName });
//     if (location) {
//       const alerts = location.alerts.concat([{
//         text,
//         time: `${new Date().getTime()}`,
//         type: helpType,
//       }]);
//       await Location.findOneAndUpdate({ name: locationName }, { alerts });
//       return location { status: true, info: { notifications: location.notifications, alerts: location.alerts } } : { status: false, info: undefined };
//     }

//   } catch (err) {
//     console.log(err);
//     return { status: false, info: undefined };
//   }
// }
export default {checkCoordinates, getAlertsAndNotifications, addAlert};
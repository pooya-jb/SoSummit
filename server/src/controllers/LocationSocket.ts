import Location from "../models/Location";
import { ILocationModel, ISocketControllerResponse } from "../types";

async function checkCoordinates (locationName : string, userLocation : number[]) : Promise <ISocketControllerResponse> {
  const location : InstanceType<ILocationModel> | null = await Location.findOne({name : locationName })
  console.log(location)
  console.log(location?.coordinates)
  console.log(userLocation)
  if (location) {
    const [xMin, xMax, yMin, yMax] = location.coordinates;
    const [xUser, yUser] = userLocation;
    // Check if user coordinates are within location boundaries
    console.log(xUser > xMin && xUser < xMax && yUser > yMin && yUser < yMax ?
      { status: true, info: { notifications: location.notifications } } :
      { status: false, info: undefined })
    return xUser > xMin && xUser < xMax && yUser > yMin && yUser < yMax ?
      { status : true, info: {notifications : location.notifications}} : 
      { status : false, info: undefined };
  }
  return { status: false, info: undefined };
}

export default {checkCoordinates};
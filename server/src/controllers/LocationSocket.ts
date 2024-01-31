import Location from "../models/Location";
import { ILocationModel } from "../types";

async function checkCoordinates (locationName : string, userLocation : number[]) {
  const location : InstanceType<ILocationModel> | null = await Location.findOne({name : locationName })
  if (location) {
    const [xMin, xMax, yMin, yMax] = location.coordinates;
    const [xUser, yUser] = userLocation;
    // Check if user coordinates are within location boundaries
    return xUser > xMin && xUser < xMax && yUser > yMin && yUser < yMax ? true : false;
  }
  return false;
}

export default {checkCoordinates};
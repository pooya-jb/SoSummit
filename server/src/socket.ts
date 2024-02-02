import dotenv from 'dotenv';
import { Server } from "socket.io";
import http from 'http'

import app from './express'
import locSockCtrlr from './controllers/LocationSocket'
import locationControllers from './controllers/Location'
import { ISocketControllerResponse } from './types';

dotenv.config();
const { CLIENT_URL, CLIENT_PORT } = process.env;


async function serverBoot () {
  const server: http.Server = http.createServer(app);

  const corsConfig = {
    // origin: [`${CLIENT_URL}${CLIENT_PORT}`],
    origin : "*"
  };
  
  const io = new Server(server, {
    cors: corsConfig
  });
  
  const locationsArray : string[] | false = await locationControllers.getAllLocationsBoot();
  console.log(locationsArray)
  // If false should attempt to reboot.
  if (locationsArray === false) {console.log('Failed to get locations from database')}
  else { 
    const acknowledge = (bool: boolean, info : object | undefined = undefined) => { return { status: bool, info } }
    
    io.on('connection', (socket) => {
      console.log('a user connected');
      socket.on('disconnect', () => {
        console.log('user disconnected');
      });
      locationsArray.forEach((location) => {
        const locationName: string = `Location-${location}`;
        const adminLocationName: string = `Location-${location}-Admin`;
    
        socket

          // Check if user is in location area. On true join lobby and send back notifications 
          .on(locationName, async (location: string, userCoords: number[], callback) => {
            const {status, info} : ISocketControllerResponse = await locSockCtrlr.checkCoordinates(location, userCoords);
            status && socket.join(locationName);
            callback(acknowledge(status, info));
          })

          // Join admin to lobby and send back location alerts
          .on(adminLocationName, async (msg, callback) => {
            // const { status, info }: ISocketControllerResponse = await locSockCtrlr.getAlertsAndNotifications(location);
            const status = true;
            const info = undefined;
            socket.join(adminLocationName);
            callback(acknowledge(status, info ));
          })

          // Add alert to location in database and send alert to admins
          .on(`${locationName}-alert`, async (location : string, userCoords: number[], helpType : string, username: string, callback) => {
            const { status, info } : ISocketControllerResponse = await locSockCtrlr.addAlert(location, userCoords, helpType, username)
            status && io.to(adminLocationName).emit(`${location}-alert-admins`, alert);
            callback(acknowledge(status, info));
          })

          // Add notification to location in database and send notification to location lobby
          .on(`Zermatt-notifications`, ({message, type}, callback) => {
            io.to(locationName).emit('msg', `hello ${location} alert`);
            callback(acknowledge(true)); // Controller Missing
          })
      })
    });
  }
  return server
  
}
  
  // serverBoot();

export default serverBoot;
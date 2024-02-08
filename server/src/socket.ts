import dotenv from 'dotenv';
import { Server } from 'socket.io';
import http from 'http';

import app from './express';
import SocketControllers from './controllers/LocationSocket';
import locationControllers from './controllers/Location';
import { ISocketControllerResponse, Alert } from './types';

dotenv.config();
const { CLIENT_URL, CLIENT_PORT } = process.env;

const server: http.Server = http.createServer(app);

const corsConfig = {
  // origin: [`${CLIENT_URL}${CLIENT_PORT}`],
  origin: '*',
};

const io = new Server(server, {
  cors: corsConfig,
});

async function serverBoot(io : Server) {

  const locationsArray: string[] | false =
    await locationControllers.getAllLocationsBoot();
  console.log(locationsArray);
  // If false should attempt to reboot.
  if (locationsArray === false) {
    console.log('Failed to get locations from database');
  } else {
    const acknowledge = (
      bool: boolean,
      info: object | undefined = undefined
    ) => {
      return { status: bool, info };
    };

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
          .on(
            locationName,
            async (
              {
                location,
                userCoords,
              }: { location: string; userCoords: number[] },
              callback
            ) => {
              const { status, info }: ISocketControllerResponse =
                await SocketControllers.checkCoordinates(location, userCoords);
              status && socket.join(locationName);
              callback(acknowledge(status, info));
            }
          )
          // receiving live locations
          .on(
            `${adminLocationName}-live`,
            (
              { coords, userName }: { coords: number[]; userName: string },
              callback
            ) => {
              const info = { coords, userName };
              const status = true;
              io.to(adminLocationName).emit(
                `${adminLocationName}-receive-live`,
                info
              );
              callback(acknowledge(status, info));
            }
          )

          // Join admin to lobby and send back location alerts
          .on(
            adminLocationName,
            async (
              { location, userName }: { location: string; userName: string },
              callback
            ) => {
              
              const { status, info }: ISocketControllerResponse =
              await SocketControllers.addActiveAdmin(location, userName);
              if (status) {
                socket.join(adminLocationName);
                io
                  .to(adminLocationName)
                  .emit(`${adminLocationName}-joined`, info);
              }
              callback(acknowledge(status, info));
            }
          )
          .on(
            `${adminLocationName}-leave`,
            async (
              { location, userName }: { location: string; userName: string },
              callback
            ) => {
              // const { status, info }: ISocketControllerResponse = await SocketControllers.getAlertsAndNotifications(location);
              const { status, info }: ISocketControllerResponse =
                await SocketControllers.removeActiveAdmin(location, userName);

              socket.leave(adminLocationName);
              status &&
                io
                  .to(adminLocationName)
                  .emit(`${adminLocationName}-left`, info);
              callback(acknowledge(status, info));
            }
          )
          // Add alert to location in database and send alert to admins
          .on(
            `${locationName}-alert`,
            async (
              { location, userCoords, helpType, username }: Alert,
              callback
            ) => {
              console.log(location, userCoords, helpType, username);
              const { status, info }: ISocketControllerResponse =
                await SocketControllers.addAlert(
                  location,
                  userCoords,
                  helpType,
                  username
                );
              status &&
                io.to(adminLocationName).emit(`${location}-alert-admins`, info);
              callback(acknowledge(status, info));
            }
          )
          .on(
            `${locationName}-alert-delete`,
            async (
              { username, location }: Alert,
              callback
            ) => {
              const { status, info }: ISocketControllerResponse =
                await SocketControllers.deleteAlert(username, location);
              status &&
                io.to(adminLocationName).emit(`${locationName}-alert-deleted`, info);
              callback(acknowledge(status, info));
            }
          )

          // Add notification to location in database and send notification to location lobby
          .on(
            `${location}-notifications`,
            async ({ message, type }, callback) => {
              const { status, info }: ISocketControllerResponse =
                await SocketControllers.addNotification(
                  location,
                  type,
                  message
                );
              status &&
                io
                  .to(locationName)
                  .to(adminLocationName)
                  .emit(`${location}-notifications-received`, info);
              callback(acknowledge(status, info)); // Controller Missing
            }
          )
          .on(
            `${location}-notifications-delete`,
            async ({ location }, callback) => {
              const { status, info }: ISocketControllerResponse =
                await SocketControllers.deleteNoots(
                  location
                );
              status &&
                io
                  .to(locationName)
                  .to(adminLocationName)
                  .emit(`${location}-notifications-deleted`, info);
              callback(acknowledge(status, info)); // Controller Missing
            }
          );
      });
    });
  }
  return server;
}

async function setUpNewLocation(io: Server, location : string) {

    const acknowledge = (
      bool: boolean,
      info: object | undefined = undefined
    ) => {
      return { status: bool, info };
    };

    io.on('connection', (socket) => {
      // console.log('a user connected');
      // socket.on('disconnect', () => {
      //   console.log('user disconnected');
      // });
        const locationName: string = `Location-${location}`;
        const adminLocationName: string = `Location-${location}-Admin`;

        socket
        // Check if user is in location area. On true join lobby and send back notifications
        .on(
          locationName,
          async (
            {
              location,
              userCoords,
            }: { location: string; userCoords: number[] },
            callback
          ) => {
            const { status, info }: ISocketControllerResponse =
              await SocketControllers.checkCoordinates(location, userCoords);
            status && socket.join(locationName);
            callback(acknowledge(status, info));
          }
        )
        // receiving live locations
        .on(
          `${adminLocationName}-live`,
          (
            { coords, userName }: { coords: number[]; userName: string },
            callback
          ) => {
            const info = { coords, userName };
            const status = true;
            io.to(adminLocationName).emit(
              `${adminLocationName}-receive-live`,
              info
            );
            callback(acknowledge(status, info));
          }
        )
        // Join admin to lobby and send back location alerts
        .on(
          adminLocationName,
          async (
            { location, userName }: { location: string; userName: string },
            callback
          ) => {
            const { status, info }: ISocketControllerResponse =
              await SocketControllers.addActiveAdmin(location, userName);
            if (status) {
              socket.join(adminLocationName);
              io
                .to(adminLocationName)
                .emit(`${adminLocationName}-joined`, info);
            }
            callback(acknowledge(status, info));
          }
        )
        .on(
          `${adminLocationName}-leave`,
          async (
            { location, userName }: { location: string; userName: string },
            callback
          ) => {
            // const { status, info }: ISocketControllerResponse = await SocketControllers.getAlertsAndNotifications(location);
            const { status, info }: ISocketControllerResponse =
              await SocketControllers.removeActiveAdmin(location, userName);
            socket.leave(adminLocationName);
            status &&
              io
                .to(adminLocationName)
                .emit(`${adminLocationName}-left`, info);
            callback(acknowledge(status, info));
          }
        )
        // Add alert to location in database and send alert to admins
        .on(
          `${locationName}-alert`,
          async (
            { location, userCoords, helpType, username }: Alert,
            callback
          ) => {
            console.log(location, userCoords, helpType, username);
            const { status, info }: ISocketControllerResponse =
              await SocketControllers.addAlert(
                location,
                userCoords,
                helpType,
                username
              );
            status &&
              io.to(adminLocationName).emit(`${location}-alert-admins`, info);
            callback(acknowledge(status, info));
          }
        )
        .on(
          `${locationName}-alert-delete`,
          async (
            { username, location }: Alert,
            callback
          ) => {
            const { status, info }: ISocketControllerResponse =
              await SocketControllers.deleteAlert(username, location);
            status &&
              io.to(adminLocationName).emit(`${locationName}-alert-deleted`, info);
            callback(acknowledge(status, info));
          }
        )
        // Add notification to location in database and send notification to location lobby
        .on(
          `${location}-notifications`,
          async ({ message, type }, callback) => {
            const { status, info }: ISocketControllerResponse =
              await SocketControllers.addNotification(
                location,
                type,
                message
              );
            status &&
              io
                .to(locationName)
                .to(adminLocationName)
                .emit(`${location}-notifications-received`, info);
            callback(acknowledge(status, info)); // Controller Missing
          }
        )
        .on(
          `${location}-notifications-delete`,
          async ({ location }, callback) => {
            const { status, info }: ISocketControllerResponse =
              await SocketControllers.deleteNoots(
                location
              );
            status &&
              io
                .to(locationName)
                .to(adminLocationName)
                .emit(`${location}-notifications-deleted`, info);
            callback(acknowledge(status, info)); // Controller Missing
          }
        );
    });
  // return server;
}

export {io};
export {setUpNewLocation}
export default serverBoot;

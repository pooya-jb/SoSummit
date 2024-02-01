import dotenv from 'dotenv';
import { Server } from "socket.io";
import http from 'http'

import app from './express'
import locSockCtrlr from './controllers/LocationSocket'

dotenv.config();
const { CLIENT_URL, CLIENT_PORT } = process.env;
const server = http.createServer(app);


const corsConfig = {
  // origin: [`${CLIENT_URL}${CLIENT_PORT}`],
  origin : "*"
};

const io = new Server(server, {
  cors: corsConfig
});

const locationsArray = ["Zermatt", "Verbier"]

const acknowledge = (bool: boolean) => { return { status: bool } }

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  locationsArray.forEach((location) => {
    const locationName: string = `Location-${location}`;
    const adminLocationName: string = `Location-${location}-Admin`;

    socket
      // .on((eventName, msg, callback) => {
      //   callback({
      //     status: 'ok'
      //   });
      // })

      .on(locationName, async (location: string, userCoords: number[], callback) => {
        console.log(location, userCoords);
        const go = await locSockCtrlr.checkCoordinates(location, userCoords);
        let status = false;
        if (go) {
          status = true;
          socket.join(locationName)
        }
        callback(acknowledge(status));
      })
      .on(adminLocationName, (msg, callback) => {
        console.log(msg);
        socket.join(adminLocationName);
        callback(acknowledge(true));
      })
      .on(`${location}-alert`, (msg) => {
        console.log('msg');
        // socket.join(adminLocationName);
        io.to(adminLocationName).emit(`${location}-alert-admins`, `hello ${location} ${msg} alert`);
        // callback(acknowledge(true));
      })
      .on(`Zermatt-notifications`, ({message, type}, callback) => {
        console.log(message);
        io.to(locationName).emit('msg', `hello ${location} alert`);
        callback(acknowledge(true));
      })
  })
});

export default server;
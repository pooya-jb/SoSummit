import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './router';
import { Server } from "socket.io";
import { createServer } from 'node:http';
import http from 'http'
import locSockCtrlr from './controllers/LocationSocket'
import { argv } from 'node:process';

dotenv.config();

const {  SERVER_PORT, CLIENT_URL, CLIENT_PORT } = process.env;

const corsConfig = {
  origin: [`${CLIENT_URL}${CLIENT_PORT}`],
  credentials: true,
};

const app: Express = express();


// io.listen(4000);
app.use(cors(corsConfig))
.use(express.json())
.use(router)

const server = http.createServer(app);
// const io = socketIO(server, {
//   cors: {
//     origin: "http://localhost:5173"
//   }
// });

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});
const locationsArray = ["Zermatt", "Verbier"]

const acknowledge = (bool: boolean) => {return { status: bool}}

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  locationsArray.forEach((location) => {
    const locationName : string = `Location-${location}`;
    const adminLocationName : string = `Location-${location}-Admin`;

    socket
      // .on((eventName, msg, callback) => {
      //   // console.log(eventName); // 'hello'
      //   // console.log(args); // [ 1, '2', { 3: '4', 5: ArrayBuffer (1) [ 6 ] } ]
      //   // const inputs = [...args];
      //   // inputs[inputs.length-1]();
      //   callback({
      //     status: 'ok'
      //   });
      // })
      .on(locationName, async (location : string, userCoords : number [], callback) => {
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
      .on(`${location}-alert`, (msg, callback) => {
        console.log(msg);
        // socket.join(adminLocationName);
        io.to(adminLocationName).emit('msg', `hello ${location} alert`);
        callback(acknowledge(true));
      })
  })
});

server.listen(SERVER_PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${SERVER_PORT} 🐙`);
});
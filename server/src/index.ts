import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './router';
import { Server } from "socket.io";
import { createServer } from 'node:http';
import http from 'http'

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
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  locationsArray.forEach((location) => {
    const locationName = `Location-${location}`;
    const adminLocationName = `Location-${location}-Admin`;

    socket.on(locationName, (msg) => {
      console.log(msg);
      socket.join(locationName);
      io.to(locationName).emit('msg', `hello ${location} room`);
    })
    socket.on(adminLocationName, (msg) => {
      console.log(msg);
      socket.join(adminLocationName);
      io.to(adminLocationName).emit('msg', `hello ${location} admin room`);
    })
    socket.on(`${location}-alert`, (msg) => {
      console.log(msg);
      // socket.join(adminLocationName);
      io.to(adminLocationName).emit('msg', `hello ${location} alert`);
    })
  })
});

server.listen(SERVER_PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${SERVER_PORT} 🐙`);
});
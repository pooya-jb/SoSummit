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
  origin: '*'  ,
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
    origin: "http://localhost:5173"
  }
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('Zermatt', (msg) => {
    console.log(msg)
    socket.join(`Location-Zermatt`);
    io.to('Location-Zermatt').emit('msg', 'hello Zermatt room')
  });
});

server.listen(SERVER_PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${SERVER_PORT} 🐙`);
});
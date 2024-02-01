import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './router';
import { Server } from "socket.io";
import http from 'http'
import locSockCtrlr from './controllers/LocationSocket'

import server from './socket';

dotenv.config();

const {  SERVER_PORT } = process.env;

server.listen(SERVER_PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${SERVER_PORT} 🐙`);
});
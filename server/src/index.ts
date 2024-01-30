import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './router';

dotenv.config();

const {  SERVER_PORT, CLIENT_URL, CLIENT_PORT } = process.env;

const corsConfig = {
  origin: [`${CLIENT_URL}${CLIENT_PORT}`],
  credentials: true,
};

const app: Express = express();

app.use(cors(corsConfig))
.use(express.json())
.use(router)

app.listen(SERVER_PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${SERVER_PORT} 🐙`);
});
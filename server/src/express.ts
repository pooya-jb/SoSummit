import express, { Express} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import router from './router';

dotenv.config();

const { CLIENT_URL, CLIENT_PORT } = process.env;

const corsConfig = {
  // origin: [`${CLIENT_URL}${CLIENT_PORT}`],
  origin: "*",
  credentials: true,
};



const app: Express = express();

app.use(cors(corsConfig))
  .use(express.json())
  .use(router);

export default app
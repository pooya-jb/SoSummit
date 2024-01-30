import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './router';

dotenv.config();

const corsConfig = {
  origin: '*'  ,
  credentials: true,
};

const app: Express = express();
const port = process.env.PORT || 3000;


app.use(cors(corsConfig))
.use(express.json())
.use(router)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
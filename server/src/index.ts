import dotenv from 'dotenv';

import serverBoot from './socket';
import { io } from './socket';

dotenv.config();

const { SERVER_PORT } = process.env;

(async () => {
  const server = await serverBoot(io)
  server.listen(SERVER_PORT || 3000, () => {
    console.log(`[server]: Server is running at http://localhost:${SERVER_PORT || 3000} 🐙`);
  });
})()

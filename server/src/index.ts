import dotenv from 'dotenv';

import serverBoot from './socket';

dotenv.config();

const {  SERVER_PORT } = process.env;

(async () => {
  const server = await serverBoot()
  server.listen(SERVER_PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${SERVER_PORT} 🐙`);
  });
})()

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const { DATABASE_URL, DATABASE_PORT, DATABASE_NAME } = process.env;

const db = mongoose
main().catch(err => console.log(err));

async function main () {
  await db.connect(`${DATABASE_URL}`);
  console.log(`Connected to database on port ${DATABASE_PORT} 🦚`);
}



export default db;
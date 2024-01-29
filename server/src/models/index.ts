import mongoose from 'mongoose';

const db = mongoose
main().catch(err => console.log(err));

async function main () {
  await db.connect('mongodb://127.0.0.1:27017/SoSummit');
  console.log('connected to data base');
}



export default db;
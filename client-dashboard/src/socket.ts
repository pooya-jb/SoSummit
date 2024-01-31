// import socketIO from "socket.io-client"
// const socket = socketIO.connect("http://localhost:3000")
import { io } from 'socket.io-client';

const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:3000';
const socket = io(URL, {
  autoConnect: false
});
export default socket;
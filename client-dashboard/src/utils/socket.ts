// import socketIO from "socket.io-client"
// const socket = socketIO.connect("http://localhost:3000")
import { io } from 'socket.io-client';
// import { adminLocationConnected, locationConnected, socketConnected } from '../redux/userSlice';
// import { useDispatch } from 'react-redux';


const URL = process.env.NODE_ENV === 'production' ? 'http://localhost:3000' : 'http://localhost:3000';
const socket = io(URL, {
  autoConnect: false
});
socket.on(`Zermatt-alert-admins`, (data) => {
  console.log(data)
}) 
export function subscribeToSocket (onConnect:()=>void, onDisconnect:()=>void) {

  socket.on('connect', onConnect);
  socket.on('disconnect', onDisconnect);

}

export function unsubscribeToSocket(onConnect:()=>void, onDisconnect:()=>void) {
  return () => {
    socket.off('connect', onConnect);
    socket.off('disconnect', onDisconnect);
  }
}

export default socket;
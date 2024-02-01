// import socketIO from "socket.io-client"
// const socket = socketIO.connect("http://localhost:3000")
import { io } from 'socket.io-client';
import { adminLocationConnected, locationConnected, socketConnected } from '../redux/userSlice';
import { useDispatch } from 'react-redux';


const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:3000';
const socket = io(URL, {
  autoConnect: false
});

export function subscribeToSocket (onConnect, onDisconnect) {

  socket.on('connect', onConnect);
  socket.on('disconnect', onDisconnect);

}

export function unsubscribeToSocket(onConnect, onDisconnect) {
  return () => {
    socket.off('connect', onConnect);
    socket.off('disconnect', onDisconnect);
  }
}

export default socket;
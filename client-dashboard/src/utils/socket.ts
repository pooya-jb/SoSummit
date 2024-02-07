import { io } from 'socket.io-client';
import { SocketServerResponse } from '../types';

const URL = process.env.NODE_ENV === 'production' ? 'http://localhost:3000' : 'http://localhost:3000';
const socket = io(URL, {
  autoConnect: false
});


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

export function checkResponse(successHandler: (response: SocketServerResponse) => void = () => { }, errorHandler: () => void = () => { }) {
  return (err: SocketServerResponse, response: SocketServerResponse) => {
    if (err) {
      if (errorHandler) errorHandler()
      console.log(err);
    } else {
      if (successHandler) successHandler(response);
    }
    return response.status;
  };
}

export default socket;
import { io } from 'socket.io-client';
import { store } from '../redux/store';

const currentStore = store.getState()

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

export default socket;
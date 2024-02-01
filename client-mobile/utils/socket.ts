import { io } from 'socket.io-client';
const localhostUrl = process.env.EXPO_PUBLIC_LOCALHOST_URL || '';
const socket = io(localhostUrl, {
  autoConnect: false
});
export default socket;



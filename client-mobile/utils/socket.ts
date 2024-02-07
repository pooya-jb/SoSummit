import { io } from 'socket.io-client';
const localhostUrl = process.env.EXPO_PUBLIC_LOCALHOST_URL || '';
const socket = io(localhostUrl, {
  autoConnect: false
});


export function checkResponse(successHandler = () => { }, errorHandler = () => { }) {
  return (err, response) => {
    if (err) {
      console.log('server did not acknowledge');
      if (errorHandler) errorHandler();
    } else {
      if (successHandler) successHandler(response);
    }
    // return response.status
  };
}

export default socket;



import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


import socket, { subscribeToSocket, unsubscribeToSocket, checkResponse } from '../utils/socket';
import * as userActions from '../redux/userSlice';
import { RootState } from '../redux/store';

export default function useSocket() {

  const dispatch = useDispatch();
  const location = useSelector((state : RootState) => state.user.location)
  const userName = useSelector((state: RootState) => state.user.username)

  useEffect(() => {
    function onConnect() {
      dispatch(userActions.socketConnected(true));
    }

    function onDisconnect() {
      dispatch(userActions.socketConnected(false));
      // dispatch(userActions.locationConnected(false));
      dispatch(userActions.adminLocationConnected(false));
    }

    subscribeToSocket(onConnect, onDisconnect);

    function success (response) {
      if(response.status) {
        console.log('Successfully left admin lobby');
      }
    }

    return () => {
      socket
        .timeout(5000)
        .emit(`Location-${location}-Admin-leave`, { location, userName }, checkResponse(success));
      unsubscribeToSocket(onConnect, onDisconnect);
    };
  }, [dispatch]);
}
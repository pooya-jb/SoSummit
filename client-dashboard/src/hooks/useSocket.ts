import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import socket, { subscribeToSocket, unsubscribeToSocket, checkResponse } from '../utils/socket';
import * as userActions from '../redux/userSlice';
import { RootState } from '../redux/store';

export default function useSocket() {

  const dispatch = useDispatch();
  const location = useSelector((state : RootState) => state.user.location)
  const userName = useSelector((state: RootState) => state.user.username)
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated)
  const savedLocation = useMemo(() => location, [location]);
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
    isAuthenticated ? socket.connect() : null;

    function success (response) {
      if(response.status) {
        console.log('Successfully left admin lobby');
      }
    }

    return () => {
      socket
        .emit(`Location-${savedLocation}-Admin-leave`, { location : savedLocation, userName }, checkResponse(success));
      unsubscribeToSocket(onConnect, onDisconnect);
      socket.disconnect()
    };
  }, [dispatch, isAuthenticated]);
}
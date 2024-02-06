import { useEffect } from 'react';
import { useDispatch } from 'react-redux';


import { subscribeToSocket, unsubscribeToSocket } from '../utils/socket';
import * as userActions from '../redux/userSlice';

export default function useSocket() {

  const dispatch = useDispatch();

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

    return () => {
      unsubscribeToSocket(onConnect, onDisconnect);
    };
  }, [dispatch]);
}
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../redux/store';
import socket, { checkResponse } from '../utils/socket';
import * as userActions from '../redux/userSlice';
import { SocketServerResponse } from '../types';

export default function useSocket() {

  const dispatch = useDispatch();
  const isConnected = useSelector((state: RootState) => state.user.isConnected);
  const location = useSelector((state: RootState) => state.user.location);
  const userName = useSelector((state: RootState) => state.user.username)

  useEffect(() => {
    if (isConnected) {
      socket
        .timeout(5000)
        .emit(
          `Location-${location}-Admin`,
          { location, userName },
          checkResponse(setAdminLocation, () => { console.log('Admin connection refused') })
        );
    }
    function setAdminLocation(response: SocketServerResponse) {
      if (response.status) {
        dispatch(userActions.adminLocationConnected(true));
      }
    }
  }, [dispatch, isConnected, location, userName]);
}
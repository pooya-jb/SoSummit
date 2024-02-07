import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '../redux/store';
import socket, { checkResponse } from '../utils/socket';
import * as userActions from '../redux/userSlice';
import * as locationActions from '../redux/locationSlice'
import { SocketServerResponse } from '../types';

export default function useSocket() {

  const dispatch = useDispatch<AppDispatch>();
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
        console.log(response.status)
        dispatch(userActions.adminLocationConnected(true));
        // dispatch(locationActions.updateActiveAdmins(response.info))
        console.log('Connected to admin-location')
        socket.on(`Location-${location}-Admin-receive-live`, (info) => {
          console.log("Connected", info)
          dispatch(locationActions.activeAdminUpdate(info));
        });
        socket.on(`Location-${location}-Admin-joined`, (info) => {
          console.log("Joined", info)
          dispatch(locationActions.activeAdminEntered(info.userName));
        });
        socket.on(`Location-${location}-Admin-left`, (info) => {
          dispatch(locationActions.activeAdminLeft(info.userName));
        });
        socket.on(`${location}-alert-admins`, (info) => {
          dispatch(locationActions.addAlert(info));
        });
      }
    }
  }, [dispatch, isConnected, location, userName]);
}
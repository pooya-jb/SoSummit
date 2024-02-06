import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import socket from '../utils/socket'
import * as locationActions from '../redux/locationSlice'
import { RootState } from '../redux/store';

export default function useAdminSocket() {

  const dispatch = useDispatch();
  const adminLocationConnected = useSelector((state : RootState) => state.user.adminLocationIsConnected)

  useEffect(() => {
    if (adminLocationConnected) {
      console.log('Connected to admin-location')
      socket.on(`Location-${location}-Admin-receive-live`, (info) => {
        console.log(info)
        dispatch(locationActions.activeAdminUpdate(info));
      });
      socket.on(`Location-${location}-Admin-joined`, (info) => {
        dispatch(locationActions.activeAdminEntered(info.userName));
      });
      socket.on(`Location-${location}-Admin-left`, (info) => {
        dispatch(locationActions.activeAdminLeft(info.userName));
      });
      socket.on(`${location}-alert-admins`, (info) => {
        dispatch(locationActions.addAlert(info));
      });
    } else {
      console.log('Disconnected from admin-location')
      socket.off(`Location-${location}-Admin-receive-live`, () => {});
      socket.off(`Location-${location}-Admin-joined`, () => {});
      socket.off(`Location-${location}-Admin-left`, () => {});
      socket.off(`${location}-alert-admins`, () => {});
    }
  }, [dispatch, adminLocationConnected]);
}
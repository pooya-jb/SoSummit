import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import apiService from '../utils/apiService';
import * as userActions from '../redux/userSlice';
import * as locationActions from '../redux/locationSlice';
import JWTUtil from '../utils/jwtUtil';
import socket from '../utils/socket';
import { AppDispatch } from '../redux/store';

export default function useAuthentication () {

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const authenticate = async (accessToken: string | null) => {
      const response = await apiService.checkJWT(accessToken ? accessToken : '');
      if (response && response.ok) {
        const res = await response.json()
          dispatch(userActions.loggedIn(res.userInfo))
          dispatch(locationActions.dashboardConnected(res.locationInfo))
        } else {
        console.log('Authentication failed');
      }
    };
    authenticate(JWTUtil.getter());
    dispatch(userActions.socketConnected(socket.connected));

  }, [dispatch]);
}
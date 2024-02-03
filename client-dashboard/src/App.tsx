import * as React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import './App.css';
import Navbar from './components/Navbar/Navbar';
import Dashboard from './components/Dashboard/Dashboard';
import { RootState } from './redux/store';
import PresentationPage from './components/PresentationPage/PresentationPage';
import JWTUtil from './utils/jwtUtil';
import apiService from './utils/apiService';
import {
  loggedIn,
  socketConnected,
  locationConnected,
  adminLocationConnected,
  setUsername,
  setEmail,
} from './redux/userSlice';

import socket, { subscribeToSocket, unsubscribeToSocket } from './utils/socket';
import {
  updateAlerts,
  activeAdminEntered,
  activeAdminLeft,
  updateActiveAdmins,
  updateAdmins,
  activeAdminUpdate,
} from './redux/locationSlice';

function App(): React.ReactNode {
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );
  const isConnected = useSelector((state: RootState) => state.user.isConnected);
  const dispatch = useDispatch();
  const location = useSelector((state: RootState) => state.user.location);

  useEffect(() => {
    const checkAuthentication = async (accessToken: string | null) => {
      const response = await apiService.checkJWT(accessToken);
      if (response.status !== 200) {
        console.log('not authenticated');
      } else {
        const res = await response.json();
        console.log(res);
        const alerts = res.locationInfo.alerts;
        // dispatch(setUsername(res.userInfo.username))
        // dispatch(setLocation(res.userInfo.location))
        // dispatch(setEmail(res.userInfo.email))
        dispatch(updateAlerts(alerts));
        dispatch(updateActiveAdmins(res.locationInfo.activeAdmins));
        dispatch(updateAdmins(res.locationInfo.admins));
        dispatch(loggedIn(res));
      }
    };
    checkAuthentication(JWTUtil.getter());
    dispatch(socketConnected(socket.connected));
  }, []);

  // subscribes on mount and unsubscribes when unmounted
  useEffect(() => {
    function onConnect() {
      dispatch(socketConnected(true));
    }

    function onDisconnect() {
      dispatch(socketConnected(false));
      dispatch(locationConnected(false));
      dispatch(adminLocationConnected(false));
    }

    subscribeToSocket(onConnect, onDisconnect);

    return () => {
      unsubscribeToSocket(onConnect, onDisconnect);
    };
  }, []);

  function setLocation(response) {
    response.status ? dispatch(locationConnected(true)) : null;
    console.log(response.info.alerts);
  }
  function setAdminLocation(response) {
    dispatch(adminLocationConnected(true));
    console.log(response.info.notifications);
    socket.on(`Location-${location}-Admin-live`, (info) => {
      dispatch(activeAdminUpdate(info));
    });
    socket.on(`Location-${location}-Admin-alert`, (info) => {
      dispatch(updateAlerts(info));
    });
    socket.on(`Location-${location}-Admin-joined`, (info) => {
      dispatch(activeAdminEntered(info.userName));
    });
    socket.on(`Location-${location}-Admin-leave`, (info) => {
      dispatch(activeAdminLeft(info.userName));
    });
  }

  function checkResponse(handler) {
    return (err, response) => {
      if (err) {
        console.log(err);
      } else {
        if (handler) handler(response);
        // console.log('here:',response.status);
      }
      return response.status;
    };
  }

  useEffect(() => {
    if (isConnected) {
      console.log(location);
      socket
        .timeout(5000)
        .emit(
          `Location-${location}-Admin`,
          location,
          checkResponse(setAdminLocation)
        );
      socket
        .timeout(5000)
        .emit(
          `Location-${location}`,
          { location, userCoords: [7.7, 46] },
          checkResponse(setLocation)
        );
    }
  }, [isConnected]);

  return (
    <>
      <ChakraProvider>
        <div id='app'>
          <Navbar />
          <BrowserRouter>
            <Routes>
              <Route
                path='/'
                element={isAuthenticated ? <Dashboard /> : <PresentationPage />}
              />
            </Routes>
          </BrowserRouter>
        </div>
      </ChakraProvider>
    </>
  );
}

export default App;

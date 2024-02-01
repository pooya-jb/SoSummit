import * as React from 'react';
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import './App.css'
import Navbar from './components/Navbar/Navbar';
import Dashboard from './components/Dashboard/Dashboard';
import { RootState } from './redux/store';
import PresentationPage from './components/PresentationPage/PresentationPage';
import JWTUtil from './utils/jwtUtil';
import apiService from './utils/apiService';
import { loggedIn, socketConnected, locationConnected, adminLocationConnected } from './redux/userSlice';
import socket, { subscribeToSocket, unsubscribeToSocket } from './utils/socket';

function App(): React.ReactNode {
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
  const isConnected = useSelector((state: RootState) => state.user.isConnected)
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuthentication = async (accessToken: string | null) => {
      const response = await apiService.checkJWT(accessToken);
      if (response.status !== 200) {
        console.log('not authenticated')
      } else {
        dispatch(loggedIn())
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
     unsubscribeToSocket(onConnect, onDisconnect)
    }
  }, []);

  function setLocation (status) {
    status ? dispatch(locationConnected(true)) : null;
  }
  function setAdminLocation() {
    dispatch(adminLocationConnected(true));
  }

  function checkResponse(handler) {

    return (err, response) => {
      if (err) {
        console.log('server did not acknowledge');
      } else {
        if (handler) handler(response.status);
        console.log('here:',response.status);
      }
      return response.status
    }
  }

  useEffect(() => {
    if (isConnected) {
      // socket.emit('Location-Zermatt', 'hello from gg(1)');
      socket.timeout(5000).emit('Location-Zermatt-Admin', 'Zermatt', checkResponse(setAdminLocation))
      socket.timeout(5000).emit('Location-Zermatt', 'Zermatt', [7.7, 45.9], checkResponse(setLocation))
      // socket.timeout(5000).emit('Zermatt-alert', 'Zermatt', checkResponse(null))
    }
  }, [isConnected])


  return (
    <>
      <ChakraProvider>
        <div id='app'>
          <Navbar />
          <BrowserRouter >
            <Routes >
              <Route path="/" element={isAuthenticated?  <Dashboard />: <PresentationPage />} />
            </ Routes>
          </BrowserRouter>
        </div>
      </ChakraProvider>
    </>
  )
}

export default App

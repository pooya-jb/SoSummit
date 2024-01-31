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
import { loggedIn, socketConnected } from './redux/userSlice';
import socket from './socket';

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
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    socket.on('msg', (msg) => {
      console.log(msg)
    })


    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);

  function checkResponse (err, response) {
    if (err) {
      console.log('server did not acknowledge');
    } else {
      console.log(response.status);
    }
  }

  useEffect(() => {
    if (isConnected) {
      // socket.emit('Location-Zermatt', 'hello from gg(1)');
      socket.timeout(5000).emit('Location-Zermatt', 'Zermatt', [23.4, 342.3], checkResponse)
    }
    if (isConnected) {
      socket.timeout(5000).emit('Location-Zermatt-Admin', 'Zermatt', checkResponse)
    }
    if (isConnected) {
      // socket.emit('Verbier-alert', 'location');
      socket.timeout(5000).emit('Zermatt-alert', 'Zermatt', checkResponse)
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

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

  useEffect(() => {
    function onConnect() {
      dispatch(socketConnected(true));
      socket.emit('Zermatt', 'hello from gg');
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

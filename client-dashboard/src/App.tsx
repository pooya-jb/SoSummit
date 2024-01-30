import './App.css'
import * as React from 'react';
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Navbar from './components/Navbar/Navbar';
import Dashboard from './components/Dashboard/Dashboard';
import { RootState } from './redux/store';
import PresentationPage from './components/PresentationPage/PresentationPage';
import JWTUtil from './utils/jwtUtil';
import apiService from './utils/apiService';
import { loggedIn } from './redux/userSlice';

function App(): React.ReactNode {
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
  const dispatch = useDispatch();
  useEffect(() => {
    const checkAuthentication = async (accessToken: string | null) => {
      const response = await apiService.checkJWT(accessToken);
      if (response.status !== 200) {
        console.log('not authenticated')
      } else {
        console.log(accessToken);
        dispatch(loggedIn())
      }
    };
    checkAuthentication(JWTUtil.getter());
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

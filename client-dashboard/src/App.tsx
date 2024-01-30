import './App.css'
import * as React from 'react';
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from 'react-redux';

import Navbar from './components/Navbar/Navbar';
import Dashboard from './components/Dashboard/Dashboard';
import { RootState } from './redux/store';

function App(): React.ReactNode {
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated)
  return (
    <>
      <ChakraProvider>
        <div id='app'>
          <Navbar />
          <BrowserRouter >
          <Routes >
          <Route path="/" element={isAuthenticated?  <Dashboard />: <Dashboard />} />
          </ Routes>
          </BrowserRouter>
        </div>
      </ChakraProvider>
    </>
  )
}

export default App

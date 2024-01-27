import './App.css'
import * as React from 'react';
import Navbar from './components/Navbar/Navbar';
import Dashboard from './components/Dashboard/Dashboard';
import { ChakraProvider } from '@chakra-ui/react'

function App(): React.ReactNode {

  return (
    <>
      <ChakraProvider>
        <div id='app'>
          <Navbar/>
          <Dashboard/>
        </div>
      </ChakraProvider>
    </>
  )
}

export default App

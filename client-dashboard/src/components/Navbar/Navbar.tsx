import * as React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import ids from './Navbar.module.css';
import ChakraMenu from './ChakraMenu/ChakraMenu';
import socket from '../../socket';
import { RootState } from '../../redux/store';

function ConnectionState() {
  const isConnected = useSelector((state: RootState) => state.user.isConnected)
  const locationIsConnected = useSelector((state: RootState) => state.user.locationIsConnected)
  const adminLocationIsConnected = useSelector((state: RootState) => state.user.adminLocationIsConnected)
  return ( <>
  <p>Connected to Socket: {'' + isConnected}</p>
  <p>Connected to Location: {'' + locationIsConnected}</p>
  <p>Connected to Admins: {'' + adminLocationIsConnected}</p>
  </>
  );
}

// function ConnectionManager() {
  
//   return (
//     <>
//       <button onClick={connect}>Connect</button>
//       <button onClick={disconnect}>Disconnect</button>
//     </>
//   );
// }

function Navbar(): React.ReactNode {
  function connect() {
    socket.connect();
  }
  
  function disconnect() {
    socket.disconnect();
  }
  
  const isAuthenticated = useSelector((state : RootState) => state.user.isAuthenticated)
  const isConnected = useSelector((state: RootState) => state.user.isConnected)
  useEffect(()=>{
    isAuthenticated === true ? connect() : disconnect(); 
  }, [isAuthenticated])

  return (
    <>
      <div id={ids.navbar}>
        <button id={ids.sosummit}>
          <h2>SoSummit</h2>
        </button>
        <ConnectionState />
        {/* {isAuthenticated && <ConnectionManager />} */}
        <ChakraMenu />
      </div>
    </>
  )
}

export default Navbar
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import styles from './Navbar.module.css';
import ChakraMenu from './ChakraMenu/ChakraMenu';
import { RootState } from '../../redux/store';

function ConnectionState() {
  const isConnected = useSelector((state: RootState) => state.user.isConnected);
  const adminLocationIsConnected = useSelector((state: RootState) => state.user.adminLocationIsConnected);
  const connected = isConnected && adminLocationIsConnected ? '🟢' : '🔴';
  return (
    <p>Online: {connected}</p>
  );
}

function Navbar(): React.ReactNode {
  const [scrollPosition, setScrollPosition] = useState(0);
  const isConnected = useSelector((state: RootState) => state.user.isConnected)
  const isAuthenticated = useSelector((state : RootState) => state.user.isAuthenticated)
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  function handleScroll() {
    const position = window.pageYOffset;
    setScrollPosition(position);
  }

  return (
    <>
      <div id={styles.navbar} style={{ backgroundColor: isConnected ? '#607ca4' : scrollPosition > 70 ? '#607ca4' : 'rgba(0, 0, 0, 0)', borderBottom: scrollPosition > 70 ? '1px solid #F6F4EB' : 'none', position: isConnected ? '' : 'fixed'}}>
        <button id={styles.sosummit}>
          <h2><span className={styles.red}>SoS</span>ummit</h2>
        </button>
        {isAuthenticated ? <ConnectionState /> : ""}
        <ChakraMenu />
      </div>
    </>
  )
}

export default Navbar
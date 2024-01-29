import classes from './Navbar.module.css';
import ids from './Navbar.module.css';
import * as React from 'react';
import ChakraMenu from './ChakraMenu/ChakraMenu';

function Navbar(): React.ReactNode {

  return (
    <>
      <div id={ids.navbar}>
        <button id = {ids.sosummit}>
          <h2>SoSummit</h2>
        </button>
        <ChakraMenu/>
      </div>
    </>
  )
}

export default Navbar
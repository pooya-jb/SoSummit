import * as React from 'react';
// import classes from './Dashboard.module.css';
import ids from './Dashboard.module.css';
import LeftColumn from './LeftColumn/LeftColumn';
import ChakraRightDrawer from './ChakraRightDrawer/ChakraRightDrawer';

function Dashboard(): React.ReactNode {

  return (
    <>
      <div id={ids.dashboard}>
        <LeftColumn />

        <ChakraRightDrawer/>
      </div>
    </>
  )
}

export default Dashboard
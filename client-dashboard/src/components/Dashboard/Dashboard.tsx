import * as React from 'react';

import ids from './Dashboard.module.css';
import LeftColumn from './LeftColumn/LeftColumn';
import RightDrawer from './RightDrawer/RightDrawer';
import Map from './Map/Map'

function Dashboard(): React.ReactNode {

  return (
    <>
      <div id={ids.dashboard}>
        <LeftColumn />
        <Map />
        <RightDrawer />
      </div>
    </>
  )
}

export default Dashboard
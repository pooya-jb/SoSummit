import * as React from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'


import ids from './LeftColumn.module.css'
import UserList from './UserList/UserList';
import NotificationColumn from './NotificationColumn/NotificationColumn';
import { useSelector } from 'react-redux';

function LeftColumn(): React.ReactNode {
  const alerts = useSelector((state: RootState) => state.location.alerts)


  return (
    <>
      <div id={ids.leftcolumn}>
        <Tabs>
          <TabList>
            <Tab>Admins</Tab>
            <Tab>Alerts {alerts.length > 0 && <FontAwesomeIcon icon={faTriangleExclamation} style={{marginLeft: 6, color: "#ff0000"}}/>}</Tab>
            <Tab>Notifications</Tab>
          </TabList>

          <TabPanels>
            <TabPanel p='0'>
              <UserList source={'admins'} />
            </TabPanel>
            <TabPanel p='0'>
              <UserList source={'users'}/>
            </TabPanel>
            <TabPanel p='0'>
              <NotificationColumn />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </>
  )
}

export default LeftColumn
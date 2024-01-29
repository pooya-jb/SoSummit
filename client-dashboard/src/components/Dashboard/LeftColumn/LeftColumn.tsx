import * as React from 'react';
import ids from './LeftColumn.module.css'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import UserList from './UserList/UserList';

function LeftColumn(): React.ReactNode {

  return (
    <>
      <div id={ids.leftcolumn}>
        <Tabs>
          <TabList>
            <Tab>Users</Tab>
            <Tab>Admins</Tab>
            <Tab>Notifications</Tab>
          </TabList>

          <TabPanels>
            <TabPanel p='0'>
              <UserList source={'users'}/>
            </TabPanel>
            <TabPanel p='0'>
              <UserList source={'admins'} />
            </TabPanel>
            <TabPanel p='0'>
              <p>three!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </>
  )
}

export default LeftColumn
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
            <TabPanel>
              <UserList/>
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
            <TabPanel>
              <p>three!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </>
  )
}

export default LeftColumn
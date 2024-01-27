import classes from './Navbar.module.css';
import ids from './Navbar.module.css';
import * as React from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from '@chakra-ui/react'

// as = { Button } rightIcon = {< ChevronDownIcon />

function Navbar(): React.ReactNode {

  return (
    <>
      <div id={ids.navbar}>
        <button id = {ids.sosummit}>
          <h2>SoSummit</h2>
        </button>
        <Menu>
            <MenuButton color="var(--textmain)" bg ="var(--backgroundmain)" h="100%" pl="1rem" pr="1rem">
            User
          </MenuButton>
            <MenuList color="var(--textmain)" bg="var(--backgroundmain)">
              <MenuItem color="var(--textmain)" bg="var(--backgroundmain)">Login</MenuItem>
              <MenuItem color="var(--textmain)" bg="var(--backgroundmain)">Create a Copy</MenuItem>
              <MenuItem color="var(--textmain)" bg="var(--backgroundmain)">Mark as Draft</MenuItem>
              <MenuItem color="var(--textmain)" bg="var(--backgroundmain)">Delete</MenuItem>
              <MenuItem color="var(--textmain)" bg="var(--backgroundmain)">Attend a Workshop</MenuItem>
          </MenuList>
        </Menu>

      </div>
    </>
  )
}

export default Navbar
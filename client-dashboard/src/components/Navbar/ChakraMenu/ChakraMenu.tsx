import * as React from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react'

// as = { Button } rightIcon = {< ChevronDownIcon />

function ChakraMenu(): React.ReactNode {

  return (
    <>
      <Menu>
        <MenuButton color="var(--textmain)" bg="var(--backgroundmain)" h="100%" pl="1rem" pr="1rem">
          User
        </MenuButton>
        <MenuList color="var(--textmain)" bg="var(--backgroundmain)" zIndex='999'>
          <MenuItem color="var(--textmain)" bg="var(--backgroundmain)">Login</MenuItem>
          <MenuItem color="var(--textmain)" bg="var(--backgroundmain)">Create a Copy</MenuItem>
          <MenuItem color="var(--textmain)" bg="var(--backgroundmain)">Mark as Draft</MenuItem>
          <MenuItem color="var(--textmain)" bg="var(--backgroundmain)">Delete</MenuItem>
          <MenuItem color="var(--textmain)" bg="var(--backgroundmain)">Attend a Workshop</MenuItem>
        </MenuList>
      </Menu>
    </>
  )
}

export default ChakraMenu
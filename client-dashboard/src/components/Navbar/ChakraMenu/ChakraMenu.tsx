import * as React from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { useRef } from 'react'
import { useDisclosure } from '@chakra-ui/react';

import RegisterLoginModal from '../../Modals/RegisterLoginModal';
import { loginSelected } from '../../../redux/displaySlice';
// as = { Button } rightIcon = {< ChevronDownIcon />

function ChakraMenu(): React.ReactNode {
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated)
  // const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = useRef(null)
  const finalRef = useRef(null)

  const dispatch = useDispatch();

  function handleLoginClick() {
    dispatch(loginSelected())
  }

  return (
    <>
      <Menu>
        <MenuButton color="var(--textmain)" bg="var(--backgroundmain)" h="100%" pl="1rem" pr="1rem">
          User
        </MenuButton>
        { isAuthenticated?
          <MenuList color="var(--textmain)" bg="var(--backgroundmain)" zIndex='999'>
          <MenuItem color="var(--textmain)" bg="var(--backgroundmain)">Settings</MenuItem>
          <MenuItem color="var(--textmain)" bg="var(--backgroundmain)">Account settings</MenuItem>
        </MenuList>
        :
        <MenuList color="var(--textmain)" bg="var(--backgroundmain)" zIndex='999'>
            <MenuItem color="var(--textmain)" bg="var(--backgroundmain)" onClick={handleLoginClick}>Login as an admin</MenuItem>
          <MenuItem color="var(--textmain)" bg="var(--backgroundmain)">Register as an admin</MenuItem>
        </MenuList>
        }
        {<RegisterLoginModal/>}
      </Menu>

    </>
  )
}

export default ChakraMenu
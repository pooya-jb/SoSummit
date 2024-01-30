import * as React from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

import LoginModal from '../../ChakraModals/LoginModal';
import { loginSelected, registerSelected } from '../../../redux/displaySlice';
import RegisterModal from '../../ChakraModals/RegisterModal';
import { loggedOut } from '../../../redux/userSlice';
import JWTUtil from '../../../utils/jwtUtil';

function ChakraMenu(): React.ReactNode {
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated)

  const dispatch = useDispatch();

  function handleLoginClick() {
    dispatch(loginSelected())
  }

  function handleRegisterClick() {
    dispatch(registerSelected())
  }

  function handleLogoutClick() {
    JWTUtil.destroyer()
    dispatch (loggedOut())
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
            <MenuItem color="var(--textmain)" bg="var(--backgroundmain)" onClick={handleLogoutClick}>Log out</MenuItem>
        </MenuList>
        :
        <MenuList color="var(--textmain)" bg="var(--backgroundmain)" zIndex='999'>
            <MenuItem color="var(--textmain)" bg="var(--backgroundmain)" onClick={handleLoginClick}>Login as an admin</MenuItem>
          <MenuItem color="var(--textmain)" bg="var(--backgroundmain)" onClick={handleRegisterClick}>Register as an admin</MenuItem>
        </MenuList>
        }
        {<LoginModal/>}
        {<RegisterModal />}
      </Menu>

    </>
  )
}

export default ChakraMenu
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
import AlertModal from '../../ChakraModals/AlertModal';
import './ChakraMenu.css'

function ChakraMenu(): React.ReactNode {
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
  const username = useSelector((state: RootState) => state.user.username);

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
        <MenuButton className="button" h="100%" pl="1rem" pr="1rem">
          {isAuthenticated ? `${username}` : "Ski Resort Login"}
        </MenuButton>
        { isAuthenticated?
          <MenuList className="menu-list" zIndex='999'>
          <MenuItem color="var(--textmain)" bg="var(--backgroundmain)">Settings</MenuItem>
          <MenuItem color="var(--textmain)" bg="var(--backgroundmain)" onClick={handleRegisterClick}>Register a new admin</MenuItem>
            <MenuItem color="var(--textmain)" bg="var(--backgroundmain)" onClick={handleLogoutClick}>Log out</MenuItem>
        </MenuList>
        :
        <MenuList className="menu-list" zIndex='999'>
            <MenuItem className="menu-item" onClick={handleLoginClick}>Login</MenuItem>
        </MenuList>
        }
        {<LoginModal/>}
        {<RegisterModal />}
        {<AlertModal />}
      </Menu>

    </>
  )
}

export default ChakraMenu
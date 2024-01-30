import * as React from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react'
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import RegisterLoginModal from '../../Modals/RegisterLoginModal';
import { useRef, useState } from 'react'
import { useDisclosure } from '@chakra-ui/react';
// as = { Button } rightIcon = {< ChevronDownIcon />

function ChakraMenu(): React.ReactNode {
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated)
  const [loginClicked, setLoginClicked] = useState(false)
  // const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = useRef(null)
  const finalRef = useRef(null)

  function handleLoginClick() {
    setLoginClicked(true);
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
        {loginClicked && <RegisterLoginModal/>}
      </Menu>

    </>
  )
}

export default ChakraMenu
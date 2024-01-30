import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';

import { loginSelected } from '../../redux/displaySlice';
import { RootState } from '../../redux/store';

function LoginModal() {
  const displayLogin = useSelector((state: RootState) => state.display.loginModalOpen);
  const dispatch = useDispatch();

  function closeHandler () {
    dispatch(loginSelected());
  }

  function handleLogin () {
    
  }

  return (
    <>
      <Modal
        isOpen={displayLogin}
        onClose={closeHandler}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Admin Login</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Email:</FormLabel>
              <Input placeholder='Email' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Password:</FormLabel>
              <Input placeholder='Password' />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={closeHandler} mr={3}>Cancel</Button>
            <Button colorScheme='blue' onClick={handleLogin}>
              Login
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default LoginModal;
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

import { registerSelected } from '../../redux/displaySlice';
import { RootState } from '../../redux/store';

function RegisterModal() {
  const displayRegister = useSelector((state: RootState) => state.display.registerModalOpen);
  const dispatch = useDispatch();

  function closeHandler () {
    dispatch(registerSelected());
  }

  return (
    <>
      <Modal
        isOpen={displayRegister}
        onClose={closeHandler}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Admin Registration</ModalHeader>
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

            <FormControl mt={4}>
              <FormLabel>First Name:</FormLabel>
              <Input placeholder='First Name' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Last Name:</FormLabel>
              <Input placeholder='Last Name' />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={closeHandler} mr={3}>Cancel</Button>
            <Button colorScheme='blue'>
              Register
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default RegisterModal;
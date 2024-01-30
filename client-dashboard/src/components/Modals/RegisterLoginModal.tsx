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
  useDisclosure
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';

import { useEffect, useRef } from 'react';
import { loginSelected } from '../../redux/displaySlice';
import { RootState } from '../../redux/store';

function RegisterLoginModal() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  useEffect(() => onOpen(), [])
  // const initialRef = useRef(null)
  // const finalRef = useRef(null)
  const displayLogin = useSelector((state: RootState) => state.display.loginModalOpen);

  const dispatch = useDispatch();

  function closeHandler () {
    dispatch(loginSelected());
  }

  return (
    <>
      {/* <Button onClick={onOpen}>Open Modal</Button> */}
      {/* <Button ml={4} ref={finalRef}>
        I'll receive focus on close
      </Button> */}

      <Modal
        // initialFocusRef={initialRef}
        // finalFocusRef={finalRef}
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
            <Button colorScheme='blue' mr={3}>
              Save
            </Button>
            <Button onClick={closeHandler}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default RegisterLoginModal;
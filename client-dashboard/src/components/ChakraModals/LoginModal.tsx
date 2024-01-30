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
import { useRef } from 'react';

import { loginSelected } from '../../redux/displaySlice';
import { RootState } from '../../redux/store';
import apiService from '../../apiService';

function LoginModal() {
  const displayLogin = useSelector((state: RootState) => state.display.loginModalOpen);
  const emailRef = useRef<HTMLFormElement>(null) 
  const passwordRef = useRef<HTMLFormElement>(null) 
  const dispatch = useDispatch();

  function closeHandler () {
    dispatch(loginSelected());
  }

  async function handleLoginSubmit (event) {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const response = await apiService.login({ email, password })
    if (response.ok) {
      closeHandler();
      console.log(response);
    } else {
      alert('Wrong email or password')
    }

    // console.log('Submitted values:', { name: emailValue, password: passwordValue });

    // apiService.login({email :})
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
              <Input placeholder='Email' ref={emailRef} required />
            </FormControl>

            <FormControl mt={4} >
              <FormLabel>Password:</FormLabel>
              {<Input placeholder='Password' ref={passwordRef} required/>}
              {/* <input placeholder='Password' ref={passwordRef}></input> */}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={closeHandler} mr={3}>Cancel</Button>
            <Button colorScheme='blue' onClick={handleLoginSubmit}>
              Login
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default LoginModal;
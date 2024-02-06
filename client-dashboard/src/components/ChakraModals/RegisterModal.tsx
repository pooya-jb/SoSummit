import {
  Modal,
  ModalOverlay,
  ModalContent,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import classes from "./Modal.module.css"
import apiService from '../../utils/apiService';
import { registerSelected } from '../../redux/displaySlice';
import { RootState } from '../../redux/store';
import { SyntheticEvent, useState } from 'react';
import { TypedResponse } from '../../types';
import ids from './Modal.module.css'
function RegisterModal() {
  const displayRegister = useSelector((state: RootState) => state.display.registerModalOpen);
  const dispatch = useDispatch();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const location = useSelector((state: RootState) => state.user.location)

  function closeHandler() {
    dispatch(registerSelected());
  }
  async function handleRegisterAdmin(event: SyntheticEvent) {
    event.preventDefault();
    const response: TypedResponse = await apiService.register({ email, password, location, username });
    if (response.error) {
      alert("User with this email already exists");
    } else if (response.accessToken) {
      console.log('user created')
    }
    closeHandler()
  }

  const handleEmailChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handleUsernameChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }

  const handlePasswordChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  return (
    <>
      <Modal
        isOpen={displayRegister}
        onClose={closeHandler}
      >
        <ModalOverlay />
        <ModalContent>
        <form onSubmit={handleRegisterAdmin} className={classes.modalform}>
            <label>Username: </label>
            <input type="text" name="username" placeholder='Username' required onChange={handleUsernameChange} />
            <label>Email: </label>
            <input type="text" name="email" placeholder='email' required onChange={handleEmailChange} />
            <label>Password: </label>
            <input type="password" name="password" placeholder='password' required onChange={handlePasswordChange} />
            <div className={classes.buttonsContainer}>
              <button type="submit" className={classes.buttonForm} id={ids.loginButton}>Login</button>
              <button type="button" className={classes.buttonForm} onClick={closeHandler}>Cancel</button>
            </div>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}

export default RegisterModal;
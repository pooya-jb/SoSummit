import { Modal, ModalOverlay, ModalContent } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useRef, SyntheticEvent } from 'react';

import { loginSelected } from '../../redux/displaySlice';
import { RootState, AppDispatch } from '../../redux/store';
import apiService from '../../utils/apiService';
import JWTUtil from '../../utils/jwtUtil';
import { loggedIn } from '../../redux/userSlice';
import { TypedResponse } from '../../types';
import classes from './Modal.module.css';
import ids from './Modal.module.css';
import * as locationActions from '../../redux/locationSlice';

function LoginModal() {
  const displayLogin = useSelector(
    (state: RootState) => state.display.loginModalOpen
  );
  const emailFormRef: React.RefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null);
  const passwordRef: React.RefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null);
    const dispatch = useDispatch<AppDispatch>();

  function closeHandler() {
    dispatch(loginSelected());
  }

  async function handleLoginSubmit(event: SyntheticEvent) {
    event.preventDefault();
    const emailForm: string = emailFormRef.current!.value;
    const password: string = passwordRef.current!.value;

    const response: TypedResponse = await apiService.login({
      email: emailForm,
      password,
    });
    if (response.error) {
      alert('Wrong email or password');
    } else if (response.accessToken) {
      JWTUtil.setter(response);
      closeHandler();
      // const locationInfo = {...response.locationInfo}
      dispatch(locationActions.dashboardConnected({...response.locationInfo, activeAdmins: [...response.locationInfo.activeAdmins, response.userInfo.username]}))
      dispatch(loggedIn(response.userInfo));
    }
  }

  return (
    <>
      <Modal isOpen={displayLogin} onClose={closeHandler}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleLoginSubmit} className={classes.modalform}>
            <label>Email: </label>
            <input type='text' name='email' required ref={emailFormRef} />
            <label>Password: </label>
            <input type='password' name='password' required ref={passwordRef} />
            <div className={classes.buttonsContainer}>
              <button
                type='submit'
                className={classes.buttonForm}
                id={ids.loginButton}
              >
                Login
              </button>
              <button type='button' className={classes.buttonForm} onClick={closeHandler}>
                Cancel
              </button>
            </div>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default LoginModal;

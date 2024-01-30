import {
  Modal,
  ModalOverlay,
  ModalContent,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useRef, SyntheticEvent } from "react";

import { loginSelected } from "../../redux/displaySlice";
import { RootState } from "../../redux/store";
import apiService from "../../utils/apiService";
import JWTUtil from "../../utils/jwtUtil";
import { loggedIn } from "../../redux/userSlice";
import { TypedResponse } from "../../types";

function LoginModal() {
  const displayLogin = useSelector(
    (state: RootState) => state.display.loginModalOpen
  );
  const emailRef: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
  const passwordRef: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  function closeHandler() {
    dispatch(loginSelected());
  }

  async function handleLoginSubmit(event: SyntheticEvent) {
    event.preventDefault();
    const email: string = emailRef.current!.value;
    const password: string = passwordRef.current!.value;

    const response: TypedResponse = await apiService.login({ email, password });
    if (response.error) {
      alert("Wrong email or password");
    } else if (response.accessToken) {
      JWTUtil.setter(response);
      closeHandler();
      dispatch(loggedIn());
    }
  }

  return (
    <>
      <Modal isOpen={displayLogin} onClose={closeHandler}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleLoginSubmit}>
            <label>Email: </label>
            <input type="email" name="email" required ref={emailRef}/>
            <label>Password: </label>
            <input type="password" name="password" required ref={passwordRef}/>
            <button type="submit">Search</button>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default LoginModal;

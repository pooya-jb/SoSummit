import {
  Modal,
  ModalOverlay,
  ModalContent,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useRef, SyntheticEvent, useState } from "react";

import { alertSelected } from "../../redux/displaySlice";
import { RootState } from "../../redux/store";
import classes from "./Modal.module.css"
import ids from "./Modal.module.css"
import socket from "../../utils/socket";

function AlertModal() {
  const [message, setMessage] = useState('')
  const [type, setType] = useState('')
  const displayAlert = useSelector(
    (state: RootState) => state.display.alertModalOpen
  );
  const dispatch = useDispatch();
  const location = useSelector((state: RootState) => state.user.location)
  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)
  }

  const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setType(e.target.value)
  }
  function closeHandler() {
    dispatch(alertSelected());
  }
  function checkResponse(handler) {

    return (err, response) => {
      if (err) {
        console.log('server did not acknowledge');
      } else {
        if (handler) handler(response.status);
      }
      return response.status
    }
  }
  async function handleLoginSubmit(event: SyntheticEvent) {
    event.preventDefault();
    socket.timeout(5000).emit(`${location}-notifications`, {message, type}, checkResponse(null))
  }

  return (
    <>
      <Modal isOpen={displayAlert} onClose={closeHandler}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleLoginSubmit} className={classes.modalform}>
            <label>Type: </label>
            <input type="text" name="type" required placeholder="insert type of notification" onChange={(e)=>handleTypeChange(e)}/>
            <label>Message: </label>
            <input type="text" name="message" required onChange={(e)=>handleMessageChange(e)} placeholder="insert message" />
            <div className={classes.buttonsContainer}>
              <button type="submit" className={classes.buttonForm} id={ids.loginButton}>Send</button>
              <button className={classes.buttonForm} onClick={closeHandler}>Cancel</button>
            </div>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AlertModal;

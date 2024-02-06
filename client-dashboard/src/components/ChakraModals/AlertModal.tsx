import {
  Modal,
  ModalOverlay,
  ModalContent,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { SyntheticEvent, useState } from "react";

import { alertSelected } from "../../redux/displaySlice";
import { RootState } from "../../redux/store";
import classes from "./Modal.module.css"
import ids from "./Modal.module.css"
import socket, {checkResponse} from "../../utils/socket";
import { addNoot } from "../../redux/locationSlice";
import { NotificationS, SocketServerResponse } from "../../types";

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
  const addNewNoot = (response : SocketServerResponse) => {
    if (response.status) {
      dispatch(addNoot(response.info as NotificationS))
    }
  }
  function closeHandler() {
    dispatch(alertSelected());
  }

  async function handleAlertSubmit(event: SyntheticEvent) {
    event.preventDefault();
    socket.timeout(5000).emit(`${location}-notifications`, {message, type, location}, checkResponse(addNewNoot))
    closeHandler()
  }

  return (
    <>
      <Modal isOpen={displayAlert} onClose={closeHandler}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleAlertSubmit} className={classes.modalform}>
            <label>Type: </label>
            <input type="text" name="type" required placeholder="insert type of notification" onChange={handleTypeChange}/>
            <label>Message: </label>
            <input type="text" name="message" required onChange={handleMessageChange} placeholder="insert message" />
            <div className={classes.buttonsContainer}>
              <button type="submit" className={classes.buttonForm} id={ids.loginButton}>Send</button>
              <button type="button" className={classes.buttonForm} onClick={closeHandler}>Cancel</button>
            </div>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AlertModal;

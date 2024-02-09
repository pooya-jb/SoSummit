import {
  Modal,
  ModalOverlay,
  ModalContent,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import classes from "./Modal.module.css"
import apiService from '../../utils/apiService';
import { locationRegisterSelected } from '../../redux/displaySlice';
import { AppDispatch, RootState } from '../../redux/store';
import { SyntheticEvent, useState } from 'react';
import { TypedResponse } from '../../types';
import ids from './Modal.module.css'

function LocationRegisterModal() {
  const [locationName, setLocationName] = useState('')
  const [coords, setCoords] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const displayLocationRegister = useSelector((state: RootState) => state.display.locationRegisterModalOpen);

  const dispatch = useDispatch<AppDispatch>();

  function closeHandler() {
    dispatch(locationRegisterSelected());
  }

  async function handleRegisterAdmin(event: SyntheticEvent) {
    event.preventDefault();
    let locationCoordinates : unknown;
    try {
      locationCoordinates = JSON.parse(coords) as number[]
        if(Array.isArray(locationCoordinates) && locationCoordinates.length === 4) {
          const response: TypedResponse = await apiService.locationRegister({ locationName, locationCoordinates, email, password, username, phoneNumber });
          console.log(response)
          if (response.status !== 201) {
            throw new Error("Could not create location. Something went wrong with the request")
          } else {
            console.log('location and admin user created');
          }
          closeHandler()
        } else throw new Error('Coordinates format is incorrect')

    } catch (err) {
    alert(err);
     return;
    }
  }

  const handleLocationNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocationName(e.target.value)
  }

  const handleCoordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCoords(e.target.value)
  }

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value)
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  return (
    <>
      <Modal
        isOpen={displayLocationRegister}
        onClose={() => { }}
      >
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleRegisterAdmin} className={classes.modalform}>
            <h3>New Location Details</h3>
            <label>Location Name: </label>
            <input type="text" name="locationName" placeholder='Username' required onChange={handleLocationNameChange} />
            <label>Location Coordinates in the following format:</label>
            <p>{'[longitude (min), longitude (max), latitude (min), latitude (max)]'}</p>
            <input type="text" name="coordinates" placeholder='[15, 16.19489545, 84.32423, 87]' required onChange={handleCoordChange} />
            <label>Contact Phone for the location: </label>
            <input type="text" name="phoneNumber" placeholder='+xx yxyxyxyyxyx' required onChange={handlePhoneNumberChange} />
            <h3>Details of First Admin</h3>
            <label>Username: </label>
            <input type="text" name="username" placeholder='Username' required onChange={handleUsernameChange} />
            <label>Email: </label>
            <input type="text" name="email" placeholder='email' required onChange={handleEmailChange} />
            <label>Password: </label>
            <input type="password" name="password" placeholder='password' required onChange={handlePasswordChange} />
            <div className={classes.buttonsContainer}>
              <button type="submit" className={classes.buttonForm} id={ids.loginButton}>Register a new Resort</button>
              <button type="button" className={classes.buttonForm} onClick={closeHandler}>Cancel</button>
            </div>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}

export default LocationRegisterModal;
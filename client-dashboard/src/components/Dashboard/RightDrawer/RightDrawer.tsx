import React, { useEffect, useState } from 'react';
import classes from './RightDrawer.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../../redux/store';
import { alertSelected, drawerToggled } from '../../../redux/displaySlice';
import apiService from '../../../utils/apiService';
import { UserInfoI } from '../../../types';
import warning from "../../../assets/exclamation_warning.webp"


function RightDrawer(): React.ReactNode {
  const isOpen: boolean = useSelector((state: RootState) => state.display.drawerIsOpen)
  const [userInfo, setUserInfo] = useState<UserInfoI>({} as UserInfoI)
  const dispatch = useDispatch();
  const handleToggleDrawer = (): void => {
    dispatch(drawerToggled())
  }
  const handleAlert = (): void => {
    console.log('clicked')
    dispatch(alertSelected())
  }

  const user = useSelector((state: RootState) => state.display.selectedUser)
  useEffect(() => {
    const fetchUser = async () => {
      console.log(user)
      const res = await apiService.fetchUserInfo(user)
      if (res){
        console.log(res)
        setUserInfo(res)}
      else return setUserInfo({})
    }
    fetchUser()
  }, [user])

  if( userInfo === undefined || !Object.keys(userInfo).length ){
    return (
      <div className={classes.rightBtns}>
        <button className={classes.alertButton} onClick={handleAlert}>
          <span className={classes.alertText}>Send notification!</span>
          <img className={classes.alertImg} src={warning}></img>
        </button>      
        <button className={classes.openright} onClick={handleToggleDrawer} >⬅️</button>
          {isOpen && <div className={classes.rightdrawer}>
          <button className={classes.openright} onClick={handleToggleDrawer}>X</button>
          <h1>Please select a user</h1>
        </div>}
      </div>
    )
  }

    return (
      <>
        <button className={classes.alertButton} onClick={handleAlert}>
          <span className={classes.alertText}>Send notification!</span>
          <img className={classes.alertImg} src={warning}></img>
        </button>
         <button className={classes.openright} onClick={handleToggleDrawer} >⬅️</button>
          {isOpen && <div className={classes.rightdrawer}>
          <button className={classes.openright} onClick={handleToggleDrawer}>X</button>
          <h1>Please select a user</h1>
        </div>}
      {isOpen && <div className={classes.rightdrawer}>
          <button className={classes.openright} onClick={handleToggleDrawer}>X</button>
          <div className={classes.userInfo}>
            <p className={classes.username}><span>Username:</span> {userInfo.username}</p>
            <p className={classes.phoneNumber}><span>Phone number: </span> {userInfo.phoneNumber}</p>
            <p className={classes.email}><span>Email:</span> {userInfo.username}</p>
            <p className={classes.experience}><span>Experience:</span> {userInfo.username}</p>
          </div>
      </div>}
    </>
  )
}

export default RightDrawer
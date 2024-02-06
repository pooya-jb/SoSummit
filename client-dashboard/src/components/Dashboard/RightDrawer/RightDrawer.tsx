import React, { useEffect, useState } from 'react';
import classes from './RightDrawer.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../../redux/store';
import { alertSelected, drawerToggled } from '../../../redux/displaySlice';
import apiService from '../../../utils/apiService';
import { UserInfoI } from '../../../types';


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
      <>
      <button className={classes.alertButton} onClick={handleAlert}>⚠️</button>
      <button className={classes.openright} onClick={handleToggleDrawer} >Open</button>
      {isOpen && <div className={classes.rightdrawer}>
      <button className={classes.openright} onClick={handleToggleDrawer}>X</button>
      <h1>Please select a user</h1>
      </div>}
      </>
    )
  }

    return (
      <>

      {isOpen && <div className={classes.rightdrawer}>
        <button className={classes.openright} onClick={handleToggleDrawer}>X</button>
        <p>{userInfo.username}</p>
      </div>}
    </>
  )
}

export default RightDrawer
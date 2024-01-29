import * as React from 'react';
// import ids from './UserInfo.module.css'
import classes from './UserInfo.module.css'
// import { useState } from 'react'
import { UserL } from '../../../../types';
import { useDispatch } from 'react-redux';
import { userSelected } from '../../../../redux/displaySlice';


function UserInfo({user} : {user:UserL}): React.ReactNode {
  const dispatch = useDispatch()
  const handleSelectUser = () => {
    dispatch(userSelected(user))
  }
  return (
    <>
     <div className={classes.userItem} onClick={handleSelectUser}>
      <p>{user.username}</p>
     </div>
    </>
  )
}

export default UserInfo;
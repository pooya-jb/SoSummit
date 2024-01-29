import * as React from 'react';
// import ids from './UserInfo.module.css'
import classes from './UserInfo.module.css'
// import { useState } from 'react'
import { UserL } from '../../../../types';


function UserInfo({user} : {user:UserL}): React.ReactNode {

  return (
    <>
     <div className={classes.userItem} onClick={()=> console.log(`clicked ${user.username}`)}>
      <p>{user.username}</p>
     </div>
    </>
  )
}

export default UserInfo;
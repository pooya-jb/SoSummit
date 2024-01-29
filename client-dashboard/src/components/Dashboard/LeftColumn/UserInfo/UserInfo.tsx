import * as React from 'react';
import ids from './UserInfo.module.css'
import { useState } from 'react'
import { UserL } from '../../../../types';


function UserInfo({user} : {user:UserL}): React.ReactNode {

  return (
    <>
     <div>
      <p>{user.username}</p>
     </div>
    </>
  )
}

export default UserInfo;
import * as React from 'react';
import ids from './UserList.module.css'
import {useState} from 'react'
import { UserL } from '../../../../types';
import UserInfo from '../UserInfo/UserInfo';

const userMock: UserL[] = [{ username: 'greg', email: 'greg@mail', age: '12', experience: 'expert', bio: 'i am greg', location: 'botswana ski resort' }, { username: 'jack', email: 'greg@mail', age: '12', experience: 'expert', bio: 'i am greg', location: 'botswana ski resort' }]

function UserList(): React.ReactNode {
  const [userList, setUserList] = useState<UserL[]>(userMock);

  return (
    <>
       {userList.map((user, index) => <UserInfo key={index} user={user} />)}
    </>
  )
}

export default UserList;
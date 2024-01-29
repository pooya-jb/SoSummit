import * as React from 'react';
import ids from './UserList.module.css'
import UserInfo from '../UserInfo/UserInfo';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';

function UserList({source}: {source: 'users' | 'admins'}): React.ReactNode {
  const users = useSelector((state: RootState)=> state.location[source])
  return (
    <>
       {users.map((user, index) => <UserInfo key={index} user={user} />)}
    </>
  )
}

export default UserList;
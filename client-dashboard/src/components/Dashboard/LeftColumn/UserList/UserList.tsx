import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';

import UserInfo from '../UserInfo/UserInfo';
import AlertInfo from '../AlertInfo/AlertInfo';
import { ActiveAdminS, AlertS } from '../../../../types';
import classes from './UserList.module.css'

function UserList({ source }: { source: 'users' | 'admins' }): React.ReactNode {
  
  const activeAdmins : ActiveAdminS[] = useSelector((state: RootState) => state.location.activeAdmins)
  const admins : string[] = useSelector((state: RootState) => state.location.admins);
  const alerts : AlertS[] = useSelector((state: RootState) => state.location.alerts)

  if(source === 'admins') {
    const adminList : React.ReactNode = admins?.map((user: string) => {
      const active : boolean = (activeAdmins.some(active => active.username === user))
      return <UserInfo key={user} user={user} active={active} />
    })

    return (
      <div className={classes.list}>
        {adminList}
      </div>
    ); 
  }
  if (source === 'users') {
    const alertList: React.ReactNode = alerts?.map((alert: AlertS) => <AlertInfo key={alert.username} alert={alert} />)
    return (
      <div className={classes.list}>
        {alertList}
      </div>
    )
  }
}

export default UserList;

import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';

import UserInfo from '../UserInfo/UserInfo';
import AlertInfo from '../AlertInfo/AlertInfo';
import { AlertS } from '../../../../types';

function UserList({ source }: { source: 'users' | 'admins' }): React.ReactNode {
  const activeAdmins = useSelector((state: RootState) => state.location.activeAdmins)
  const admins = useSelector((state: RootState) => state.location.admins);
  const alerts = useSelector((state: RootState) => state.location.alerts)

  if(source === 'admins') {
    return (
      <>
        {admins &&
          admins.map((user: string, index:number) => {
            let flag = false
            if (activeAdmins.some( active=> active.username === user)) flag = true
        return <UserInfo key={index} user={user} active={flag} />
        })}
      </>
    );
  } else {

    return (
      <>
      {alerts &&
        alerts.map((alert: AlertS, index: number) => <AlertInfo key={index} alert={alert}/>)}
    </>
  );
}
}

export default UserList;

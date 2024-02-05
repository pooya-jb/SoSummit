import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';

import UserInfo from '../UserInfo/UserInfo';

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
          if (activeAdmins.includes(user)) flag = true
        return <UserInfo key={index} user={user} active={flag} />
        })}
      </>
    );
  } else {

    return (
      <>
      {alerts &&
        alerts.map((alert, index: number) => <UserInfo key={index} user={alert.username} active={false} />)}
    </>
  );
}
}

export default UserList;

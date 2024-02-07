import * as React from 'react';
import { useDispatch } from 'react-redux';

import classes from './UserInfo.module.css';

function UserInfo({ user, active }: { user: string, active: boolean }): React.ReactNode {
  return (
    <>
      <div className={classes.userItem} >
        <p>{user} {active && <span>🟢</span> }</p>
      </div>
    </>
  );
}

export default UserInfo;

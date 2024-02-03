import * as React from 'react';
import { useDispatch } from 'react-redux';

import classes from './UserInfo.module.css';
import { UserL } from '../../../../types';
import { userSelected } from '../../../../redux/displaySlice';

function UserInfo({ user }: { user: string }): React.ReactNode {
  const dispatch = useDispatch();
  const handleSelectUser = (): void => {
    dispatch(userSelected(user));
  };
  return (
    <>
      <div className={classes.userItem} onClick={handleSelectUser}>
        <p>{user}</p>
      </div>
    </>
  );
}

export default UserInfo;

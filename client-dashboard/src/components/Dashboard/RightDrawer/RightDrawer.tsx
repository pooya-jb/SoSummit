import * as React from 'react';
import classes from './RightDrawer.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../../redux/store';
import { alertSelected, drawerToggled } from '../../../redux/displaySlice';
import { clippingParents } from '@popperjs/core';

function RightDrawer(): React.ReactNode {
  const isOpen: boolean = useSelector((state: RootState) => state.display.drawerIsOpen)
  const dispatch = useDispatch();
  const handleToggleDrawer = ():void => {
    dispatch(drawerToggled())
  }
  const handleAlert= ():void => {
    console.log('clicked')
    dispatch(alertSelected())
  }

  const user = useSelector((state: RootState) => state.display.selectedUser)
  return (
    <>
      <button className={classes.alertButton} onClick={handleAlert}>⚠️</button>
      <button className={classes.openright} onClick={handleToggleDrawer} >Open</button>

      {isOpen && <div className={classes.rightdrawer}>
        <button className={classes.openright} onClick={handleToggleDrawer}>X</button>
        <p>{user ? user.username : 'no user selected'}</p>
      </div>}
    </>
  )
}

export default RightDrawer
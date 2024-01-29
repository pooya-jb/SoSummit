import * as React from 'react';
import classes from './RightDrawer.module.css'
import {useSelector, useDispatch} from 'react-redux'
import { RootState } from '../../../redux/store';
import { drawerToggled } from '../../../redux/displaySlice';

function RightDrawer(): React.ReactNode {
  const isOpen : boolean = useSelector((state : RootState) => state.display.drawerIsOpen)
  const dispatch = useDispatch();
  const handleToggleDrawer = () => {
    dispatch(drawerToggled())
  }

  return (
    <>
    <button className={classes.openright} onClick={handleToggleDrawer} >Open</button>
    
    {isOpen && <div className={classes.rightdrawer}>
      <button className={classes.openright} onClick={handleToggleDrawer}>X</button>
      <p>Test</p>
    </div>}
    </>
  )
}

export default RightDrawer
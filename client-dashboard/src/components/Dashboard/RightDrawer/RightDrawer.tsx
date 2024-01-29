import * as React from 'react';
import classes from './RightDrawer.module.css'
import {useState} from 'react'

function RightDrawer(): React.ReactNode {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleToggleDrawer = () => {
    setIsOpen(!isOpen)
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
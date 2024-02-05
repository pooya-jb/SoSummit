import * as React from 'react';
import { useDispatch } from 'react-redux';

import classes from './NootInfo.module.css';

function NootInfo({ noot, deleteNoot }): React.ReactNode {
  return (
    <>
      <div className={classes.userItem} >
        <p>{noot.text}</p>
        <p>{noot.type}</p>
        <button onClick={(e) => deleteNoot(e, noot.time)} >X</button>
      </div>
    </>
  );
}

export default NootInfo;

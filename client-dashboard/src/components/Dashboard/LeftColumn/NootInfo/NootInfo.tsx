import * as React from 'react';
import imgdelete from "../../../../assets/delete.png"

import classes from './NootInfo.module.css';
import { NotificationS } from '../../../../types';

function NootInfo({ noot, deleteNoot } : {noot:  NotificationS, deleteNoot: (e: React.MouseEvent<HTMLButtonElement>, time: string) => Promise<void> }): React.ReactNode {
  return (
    <>
      <div className={classes.userItem} >
        <p className={classes.type}>{noot.type}</p>
        <p className={classes.text}>{noot.text}</p>
        <button onClick={(e) => deleteNoot(e, noot.time)} className={classes.deleteBtn}>
            <img className={classes.deleteBtnImg} src={imgdelete} alt="delete button" />
        </button>
        <span className={classes.deleteText}>Delete</span>
      </div>
    </>
  );
}

export default NootInfo;

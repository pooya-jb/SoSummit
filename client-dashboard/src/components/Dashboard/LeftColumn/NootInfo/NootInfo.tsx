import * as React from 'react';
import { useDispatch } from 'react-redux';
import imgdelete from "../../../../assets/delete.png"


import classes from './NootInfo.module.css';

function NootInfo({ noot, deleteNoot }): React.ReactNode {
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

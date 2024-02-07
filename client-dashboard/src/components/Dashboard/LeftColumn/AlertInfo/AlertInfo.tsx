import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AlertS } from "../../../../types";

import classes from "./AlertInfo.module.css";
import { updateAlerts } from "../../../../redux/locationSlice";
import { RootState } from "../../../../redux/store";
import apiService from "../../../../utils/apiService";
import { userSelected } from "../../../../redux/displaySlice";
import imgdelete from "../../../../assets/delete.png"

function AlertInfo({ alert }: { alert: AlertS }): React.ReactNode {
  const dispatch = useDispatch();
  const currentAlerts = useSelector(
    (state: RootState) => state.location.alerts
  );
  const location = useSelector((state: RootState) => state.user.location);
  const userSelectedBool = useSelector((state: RootState) => state.display.selectedUser)
  const handleDelete = async (): Promise<void> => {
    const res = await apiService.deleteAlert(alert.username, location);
    if (res.status === 200) {
      dispatch(updateAlerts(currentAlerts.filter((oldAlert: AlertS) => alert.username !== oldAlert.username)));
    }
  };
  const handleAlertClick = () => {
    console.log('fired')
    dispatch(userSelected(alert.username))
  }

  const time =new Date( Number(alert.time)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  return (
    <>
      <div className={`${classes.alertItem} ${userSelectedBool === alert.username && classes.alertItemActive}`}>
        <p>User: {alert.username}</p>
        <p className={classes.type}>Type: {alert.type}</p>
        <p className={classes.time}>{time}</p>
        <button className={classes.deleteAlert} onClick={handleDelete}>
          <img className={classes.deleteBtnImg} src={imgdelete} alt="delete button" />
        </button>
        <span className={classes.deleteText}>Delete</span>
        <button className={classes.userInfo} onClick={handleAlertClick}>User info ➡️</button>
      </div>
    </>
  );
}

export default AlertInfo;

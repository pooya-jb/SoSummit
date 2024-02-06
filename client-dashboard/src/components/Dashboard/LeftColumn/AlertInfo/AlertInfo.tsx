import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AlertS } from "../../../../types";

import classes from "./AlertInfo.module.css";
import { updateAlerts } from "../../../../redux/locationSlice";
import { RootState } from "../../../../redux/store";
import apiService from "../../../../utils/apiService";

function AlertInfo({ alert }: { alert: AlertS }): React.ReactNode {
  const dispatch = useDispatch();
  const currentAlerts = useSelector(
    (state: RootState) => state.location.alerts
  );
  const location = useSelector((state: RootState) => state.user.location);

  const handleDelete = async (): Promise<void> => {
    const res = await apiService.deleteAlert(alert.username, location);
    if (res.status === 200) {
      dispatch(updateAlerts(currentAlerts.filter((oldAlert: AlertS) => alert.username !== oldAlert.username)));
    }
  };
  return (
    <>
      <div className={classes.alertItem}>
        <p>{alert.type}</p>
        <p>{alert.username}</p>
        <p>{alert.time}</p>
        <button onClick={handleDelete}>X</button>
      </div>
    </>
  );
}

export default AlertInfo;

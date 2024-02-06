import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import NootInfo from '../NootInfo/NootInfo';
import classes from './NotificationColumn.module.css';
import apiService from '../../../../utils/apiService';
import { updateNoots } from '../../../../redux/locationSlice';
import { NotificationS } from '../../../../types';


const NotificationColumn = () => {
  const noots: NotificationS[] = useSelector((state: RootState) => state.location.noots)
  const location : string = useSelector((state: RootState) => state.user.location)
  const dispatch = useDispatch()

  const deleteNoot = async (e: React.MouseEvent<HTMLButtonElement>, time : string) => {
    const res = await apiService.deleteNoot(time, location)
    if (res.status === 200) {
      const newNoots : NotificationS[] = noots.filter(noot => noot.time !== time)
      dispatch(updateNoots(newNoots))
    }
  }

  return (
    <div className={classes.container}>

      {noots &&
        noots.map((noot, index: number) => <NootInfo key={index} noot={noot} deleteNoot={deleteNoot} />)}

    </div>

  );
}

export default NotificationColumn;

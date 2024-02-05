import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import NootInfo from '../NootInfo/NootInfo';
import classes from './NotificationColumn.module.css';
import apiService from '../../../../utils/apiService';
import { updateNoots } from '../../../../redux/locationSlice';


const NotificationColumn = () => {
  const noots = useSelector((state: RootState) => state.location.noots)
  const dispatch = useDispatch()
  const location = useSelector((state: RootState) => state.user.location)
 
  const deleteNoot = async (e, time) => {
   const res = await apiService.deleteNoot(time, location)
   console.log(res)
   const newNoots = noots.filter(noot => noot.time !== time)
   if (res.status === 200) dispatch(updateNoots(newNoots))
  }

  return (
    <div className={classes.container}>

      {noots &&
        noots.map((noot, index: number) => <NootInfo key={index} noot={noot} deleteNoot={deleteNoot} />)}

    </div>

  );
}

export default NotificationColumn;

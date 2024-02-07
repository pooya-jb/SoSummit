import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import AuthScreen from '../../screens/AuthScreen';
import { tokenValidation } from '../../utils/ApiService';
import { useDispatch } from 'react-redux';
import { adminLoggedIn, setActiveAlert, setAuth, userLoggedIn } from '../../redux/userSlice';
import { setPhoneNumber, updateAlerts, updateLocations, updateNotifications } from '../../redux/locationSlice';
import { HomeScreen } from '../../screens/HomeScreen';
import * as TaskManager from "expo-task-manager"
import socket from '../../utils/socket';

const HomePage = () => {
  const dispatch = useDispatch();
  tokenValidation().then(res => {
    if (!res) {
    return
    } else {
      if (res.userInfo.location) {
        const { username, location, email } = res.userInfo;
        dispatch(adminLoggedIn({ username, location, email }))
        dispatch(updateNotifications(res.locationInfo.notifications))
        dispatch(updateAlerts(res.locationInfo.alerts))
        dispatch(setPhoneNumber(res.locationInfo.phoneNumber))
      } else {
        const { username, email, age, bio, experience } = res.userInfo;
        dispatch(userLoggedIn({ username, email, age, bio, experience }))
        dispatch(updateLocations(res.locations));
        dispatch(setActiveAlert(res.userInfo.activeAlert))
      }
    }
  })
  const isAuth = useSelector((state: RootState) => state.user.isAuth);

  return (
    <>
      {isAuth ? <HomeScreen /> : <AuthScreen />}
    </>
  );
};

export default HomePage;

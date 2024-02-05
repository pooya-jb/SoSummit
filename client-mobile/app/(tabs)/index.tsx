import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import AuthScreen from '../../screens/AuthScreen';
import { tokenValidation } from '../../utils/ApiService';
import { useDispatch } from 'react-redux';
import { setAuth } from '../../redux/userSlice';
import { HomeScreen } from '../../screens/HomeScreen';
import * as TaskManager from "expo-task-manager"

    TaskManager.defineTask('BACKGROUND_LOCATION_SUBSCRIPTION', ({ data: { locations }, error }) => {
      if (error) {
        // check `error.message` for more details.
        return;
      }
      console.log('Received new locations from app', locations);
    });

const HomePage = () => {

  const dispatch = useDispatch();
  tokenValidation().then(res => {if (res) dispatch(setAuth(true))}) 
  const isAuth = useSelector((state: RootState) => state.user.isAuth);

  return (
    <>
      {isAuth ? <HomeScreen /> : <AuthScreen />}
    </>
  );
};

export default HomePage;

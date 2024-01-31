import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import AuthScreen from '../../screens/AuthScreen';
import { tokenValidation } from '../../utils/AppService';
import { useDispatch } from 'react-redux';
import { setAuth } from '../../redux/userSlice';
import { HomeScreen } from '../../screens/HomeScreen';
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

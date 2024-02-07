import { useSelector } from 'react-redux';
import Home from '../components/Home/Home';
import { RootState } from '../redux/store';

export const HomeScreen = () => {
  const isAuthenticated = useSelector((state : RootState) => state.user.isAuth)
  if (isAuthenticated) {
    return <Home />;
  } else return <></>
};

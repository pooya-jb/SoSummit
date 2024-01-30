import { View, Text, Pressable } from 'react-native';
import Home from '../../components/home/Home';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import AuthScreen from '../../screens/AuthScreen';

const HomePage = () => {
  const isAuth = useSelector((state: RootState) => state.user.isAuth);
  return (
    <>
      {/* <Pressable onPress={() => router.push('/users/2')}>
        <Text>go to user 2</Text>
      </Pressable> */}
      {isAuth ? <Home /> : <AuthScreen />}
    </>
  );
};

export default HomePage;

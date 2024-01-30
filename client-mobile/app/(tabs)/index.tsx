import { View, Text, Pressable } from 'react-native';
import Home from '../../components/home/Home';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import LoginScreen from '../../screens/LoginScreen';

const HomePage = () => {
  const isAuth = useSelector((state: RootState) => state.user.isAuth)
  return (
    <View>
      {/* <Pressable onPress={() => router.push('/users/2')}>
        <Text>go to user 2</Text>
      </Pressable> */}
     {isAuth? <Home />: <LoginScreen/>}
    </View>
  );
};

export default HomePage;

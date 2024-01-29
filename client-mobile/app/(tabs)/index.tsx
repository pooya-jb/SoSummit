import { router } from 'expo-router';
import { View, Text, Pressable } from 'react-native';
import Home from '../../components/home/Home';

const HomePage = () => {
  return (
    <View>
      {/* <Pressable onPress={() => router.push('/users/2')}>
        <Text>go to user 2</Text>
      </Pressable> */}
      <Home />
    </View>
  );
};

export default HomePage;

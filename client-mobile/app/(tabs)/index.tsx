import { router } from 'expo-router';
import { View, Text, Pressable } from 'react-native';

const HomePage = () => {
  return (
    <View>
      <Text>Home Page</Text>
      <Pressable onPress={() => router.push('/users/2')}>
        <Text>go to user 2</Text>
      </Pressable>
    </View>
  );
};

export default HomePage;

import { Tabs } from 'expo-router';
import { Pressable, Text, View, Image } from 'react-native';
import { Provider, useSelector } from 'react-redux';
import { RootState, store } from '../../redux/store';

const TabsLayout = () => {
  const { isAuth } = useSelector((state: RootState) => state.user);
  return (
    <Tabs
      screenOptions={() => ({
        tabBarStyle: {
          display: 'none'
        },
      })}
    > 
      <Tabs.Screen
        name='User'
        options={{
          headerTitle: 'User settings',
          title: 'User',
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;

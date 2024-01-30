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
          display: isAuth ? 'flex' : 'none',
        },
      })}
    >
      <Tabs.Screen
        name='index'
        options={{
          headerTitle: `${isAuth ? 'Home' : 'Auth'}`,
          title: '',
          tabBarIcon: () => {
            return (
              <View
                style={{
                  padding: 5,
                  top: 8,
                }}
              >
                <Image
                  source={require('../../assets/home-icon.png')}
                  style={{ width: 30, height: 30 }}
                />
              </View>
            );
          },
          headerRight: () => {
            return isAuth ? (
              <View>
                <Pressable onPress={() => console.log('user clicked')}>
                  <Image source={require('../../assets/user.png')} style={{height:25, width:25, margin:15}} />
                </Pressable>
              </View>
            ) : undefined;
          },
        }}
      />
      <Tabs.Screen
        name='alert'
        options={{
          headerTitle: 'Help',
          title: '',
          tabBarIcon: () => {
            return (
              <View
                style={{
                  padding: 5,
                  top: 8,
                }}
              >
                <Image
                  source={require('../../assets/sos-icon02.png')}
                  style={{ width: 30, height: 30 }}
                />
              </View>
            );
          },
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;

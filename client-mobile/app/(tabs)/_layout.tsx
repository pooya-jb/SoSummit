import { Tabs, Link } from 'expo-router';
import { Pressable, Text, View, Image, Platform } from 'react-native';
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
          headerTitle: `${isAuth ? 'Home' : 'Sign In'}`,
          headerTitleAlign: 'center',
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
                <Pressable
                  android_ripple={{ color: 'transparent', borderless: false }} // Add this line
                >
                  <Link
                    href='/User'
                    style={{ height: 25, width: 25, marginRight: 15 }}
                  >
                    <Image
                      source={require('../../assets/user.png')}
                      style={{
                        height: Platform.OS === 'ios' ? 25 : 20,
                        width: Platform.OS === 'ios' ? 25 : 20, // Adjust the width as needed
                        marginRight: 30,
                      }}
                    />
                  </Link>
                </Pressable>
              </View>
            ) : undefined;
          },
          headerLeft: () => {
            return isAuth ? (
              <View>
                <Pressable
                  android_ripple={{ color: 'transparent', borderless: false }} // Add this line
                >
                  <Link
                    href='/Notifications'
                    style={{ height: 30, width: 30, marginLeft: 15 }}
                  >
                    <Image
                      source={require('../../assets/notification.png')}
                      style={{
                        height: Platform.OS === 'ios' ? 25 : 22,
                        width: Platform.OS === 'ios' ? 25 : 22, // Adjust the width as needed
                        marginRight: 30,
                      }}
                    />
                  </Link>
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
          headerTitleAlign: 'center',
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

import { Tabs } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

const TabsLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name='index'
        options={{
          headerTitle: 'Home',
          title: 'Home',
          headerRight: () => {
            return (
              <View>
                <Pressable>
                  <Text>Menu</Text>
                </Pressable>
              </View>
            );
          },
        }}
      />
      <Tabs.Screen
        name='alert'
        options={{
          headerTitle: 'Help',
          title: 'SOS',
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;

import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

const RootLayout = () => {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen
          name='(tabs)'
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name='User'
          options={{
            presentation: 'modal',
          }}
        />
        <Stack.Screen
          name='Locations'
          options={{
            presentation: 'modal',
          }}
        />
        <Stack.Screen
          name='Notifications'
          options={{
            presentation: 'modal',
          }}
        />
      </Stack>
    </Provider>
  );
};

export default RootLayout;

import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { useFonts } from 'expo-font';

const RootLayout = () => {
  const [fontsLoaded] = useFonts({
    "Poppins-Black" : require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold" : require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold" : require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-Italic" : require("../assets/fonts/Poppins-Italic.ttf"),
    "Poppins-Light" : require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium" : require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular" : require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold" : require("../assets/fonts/Poppins-SemiBold.ttf"),
    "RussoOne-Regular" : require("../assets/fonts/RussoOne-Regular.ttf")
  });
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

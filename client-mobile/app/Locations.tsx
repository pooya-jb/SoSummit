import {
  View,
  Pressable,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Alert,
  Platform
} from 'react-native';
import { router } from 'expo-router';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useDispatch } from 'react-redux';
import { useState, useRef, useEffect } from 'react';
import * as Location from 'expo-location'
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

import { setLocation, socketConnected, tripStarted } from '../redux/userSlice';
import { addNotification, updateNotifications } from '../redux/locationSlice';
import socket, {checkResponse} from '../utils/socket';



Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

 


export default function Locations() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('')
  const locations = useSelector((state: RootState) => state.location.locations);
  const userLocation = useSelector((state: RootState) => state.user.userLocation);

   async function schedulePushNotification(info : {text: string, type: string, time: string}) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: `${info.type} ⛷️!`,
      body: `${info.text}`,
      data: { data: 'goes here' },
    },
    trigger: { seconds: 2 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Platform.OS === 'ios') {
     const { status: existingStatus } = await Notifications.getPermissionsAsync();
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      console.error('Permission to receive notifications not granted.');
      return;
    }
  }
    await Notifications.setNotificationCategoryAsync('your-category', [
      {
        identifier: 'your-category',
        buttonTitle: 'Your Action',
        options: {
          // Add any additional options for the action
          background: true,
          foreground: true, // Whether to launch the app in the foreground when the action is tapped
          destructive: false, // Whether the action should be treated as destructive
          authenticationRequired: false, // Whether the action requires unlocking the device
        },
      },
    ]);
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    token = (await Notifications.getExpoPushTokenAsync({ projectId: 'your-project-id' })).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}
  
   useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const handleLocationClick = async (title: string) => {
    setLoading(true);
    setSelectedLocation(title)
    const { coords } = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Highest,
      timeInterval: 5000,
      distanceInterval: 0
    })
    const { latitude, longitude } = coords;
      socket
        .on('connect', () => dispatch(socketConnected(true)))
        .on('disconnect', () => dispatch(socketConnected(false)))
        .connect()
        .timeout(5000)
        .emit(
          `Location-${title}`,
          { location: title, userCoords: [longitude, latitude] },
          checkResponse(setUserStart, alertOfNoResponse)
        );
  };

  function alertOfNoResponse() {
    Alert.alert(
      'Error',
      'Server did not respond. Please try again in one minute.',
      [
        {
          text: 'Okay',
          style: 'cancel',
        },
      ]
    );
    setLoading(false);
  }

  function setUserStart(response) {
    if (response.status) {
      dispatch(setLocation(response.info.location));
      dispatch(updateNotifications(response.info.notifications));
      dispatch(tripStarted(true));
      router.navigate('../');
      socket.on(`${response.info.location}-notifications-received`, (info) => {
        console.log("new notification received!")
        console.log(info);
        schedulePushNotification(info);
        dispatch(addNotification(info))
      });
    } else {
      Alert.alert(
        'Error',
        'You are not in a protected area. Please try again when you enter one.',
        [
          {
            text: 'Okay',
            style: 'default',
          },
        ]
      );
    }
    setLoading(false);
  }

  type ItemProps = { title: string };
  const Item = ({ title }: ItemProps) => (
    <View style={styles.locationItem}>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: pressed ? '#669FA8' : '#C5FEFF' },
        ]}
        onPress={() => handleLocationClick(title)}
      >
        <Text style={styles.locationName}>{title}</Text>
      </Pressable>
    </View>
  );

  return (
    <SafeAreaView style={styles.locationContainer}>
      {loading && (
        <View
          style={{
            justifyContent: 'center',
            flex: 1,
          }}
        >
          <ActivityIndicator size='large' />
        </View>
      )}
      {!loading && (
        <FlatList
          data={locations}
          renderItem={({ item }) => <Item title={item} />}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  locationContainer: {
    flex: 1,
    alignItems: 'center',
  },
  locationItem: {},
  locationName: {
    fontSize: 20,
    textAlign: 'center',
  },
  button: {
    margin: 10,
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: '#C5FEFF',
    borderRadius: 5,
  },
});

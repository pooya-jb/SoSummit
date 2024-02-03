import { Pressable, Text, View, Image, AppState, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { useDispatch, useSelector } from 'react-redux';
import { router } from 'expo-router';

import socket from '../../utils/socket';
import { setCoords, setLocation, socketConnected, tripStarted } from '../../redux/userSlice';
import { styles } from './Home.styles';
import { RootState } from '../../redux/store';
import { checkResponse } from '../../utils/socket';
import { updateNotifications, addNotification, updateAlerts, addAlert } from '../../redux/locationSlice';

const Home = () => {

  // STATE AND USE EFFECT
  const [inMapLocation, setInMapLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [mapRegion, setMapRegion] = useState({
    latitude: 27.9881,
    longitude: 86.925,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [userRegion, setUserRegion] = useState({
    latitude: 27.9881,
    longitude: 86.925,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const resort = useSelector((state: RootState) => state.user.location);
  const isAdmin = useSelector((state: RootState) => state.user.isAdmin);
  const userName = useSelector((state: RootState) => state.user.username);
  const onTrip = useSelector((state: RootState) => state.user.tripStarted);

  useEffect(() => {
    // Subscribe to app state changes
    liveLocation()
    const appStateSubscription = AppState.addEventListener(
      'change',
      (state) => {
        getLocation(state);
      }
    );
    // Clean up subscription on component unmount
    return () => {
      appStateSubscription.remove();
    };
  }, []);

  const dispatch = useDispatch();

  // START AND STOP BUTTON HANDLERS
  const connectHandler = async () => {
    router.navigate('../Locations');
  };

  const adminConnectHandler = async () => {
    socket.on('connect', () => dispatch(socketConnected(true)));
    socket.on('disconnect', () => dispatch(socketConnected(false)));
    socket.connect().timeout(5000).emit(`Location-${resort}-Admin`, { location : resort, userName : userName }, checkResponse(adminLobbyJoined, alertOfNoResponse))
  }

  const stopBtnHandler = async () => {
    if (isAdmin) {
      socket
      .timeout(5000)
      .emit(`Location-${resort}-Admin-leave`, { location : resort, userName : userName }, checkResponse(adminLobbyLeft, alertOfNoResponse));
    } else {
      socket.disconnect();
      socket.off('connect');
      socket.off('disconnect');
      dispatch(tripStarted(false));
      dispatch(setLocation(''));
      dispatch(updateAlerts([]));
      dispatch(updateNotifications([]));
    }
  }

  // MAP FUNCTIONS
  const getLocation = async (state: string) => {
    if (state === 'active') setInterval(liveLocation, 5000);
  };

  const liveLocation = async () => {
    let location = await Location.getCurrentPositionAsync({});
    console.log(location);
    dispatch(setCoords([location.coords.latitude, location.coords.longitude]));
    setInMapLocation(location);
    setMapRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
    setUserRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
  };

  const regionChangeHandler = (newRegion: any) => {
    if (newRegion) {
      setMapRegion({
        latitude: newRegion.latitude,
        longitude: newRegion.longitude,
        latitudeDelta: newRegion.latitudeDelta,
        longitudeDelta: newRegion.longitudeDelta,
      });
    }
  };

  const currentLocationHandler = () => {
    if (inMapLocation?.coords) {
      setMapRegion(userRegion);
    }
  };

  // SOCKET CONNECTIONS RESPONSE HANDLERS
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
  }

  function adminLobbyJoined (response) {
    if (response.status) {
      dispatch(updateNotifications(response.info.notifications));
      dispatch(updateAlerts(response.info.alerts));
      dispatch(tripStarted(true));
      socket.on(`${response.info.location}-notifications-received`, (info) => dispatch(addNotification(info)));
      socket.on(`${response.info.location}-alerts-received`, (info) => dispatch(addAlert(info)));
    } else {
      Alert.alert(
        'Error',
        'Failed to enter admins lobby',
        [
          {
            text: 'Okay',
            style: 'default',
          },
        ]
      );
    }
  }

  function adminLobbyLeft (response) {
    if (response.status) {
      socket.disconnect();
      socket.off('connect');
      socket.off('disconnect');
      dispatch(tripStarted(false));
      dispatch(setLocation(''));
      dispatch(updateAlerts([]));
      dispatch(updateNotifications([]));
    } else {
      Alert.alert(
        'Error',
        'Failed to leave admins lobby',
        [
          {
            text: 'Okay',
            style: 'default',
          },
        ]
      );
    }
  }

  return (
    <View style={styles.home}>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          region={mapRegion}
          onRegionChangeComplete={regionChangeHandler}
        >
          <Marker coordinate={userRegion} title='You are here'>
            <Image
              source={require('../../assets/marker2.png')}
              style={{ width: 40, height: 40 }}
            />
          </Marker>
        </MapView>

        <View style={styles.buttonContainer}>
          {!onTrip ? <Pressable
            onPress={isAdmin ? adminConnectHandler : connectHandler}
            style={({ pressed }) => [
              styles.button,
              { backgroundColor: pressed ? '#0A7F8C' : '#10B2C1' },
            ]}
          >
            <Text style={styles.buttonText}>Start</Text>
          </Pressable> : <Pressable
            onPress={stopBtnHandler}
            style={({ pressed }) => [
              styles.button,
              { backgroundColor: pressed ? '#0A7F8C' : '#10B2C1' },
            ]}
          >
            <Text style={styles.buttonText}>Stop</Text>
          </Pressable>}

        </View>
        <View style={styles.currentLocationBtnContainer}>
          <Pressable
            style={{
              alignItems: 'center',
              padding: 2,
            }}
            onPress={currentLocationHandler}
          >
            <Image
              source={require('../../assets/location.png')}
              style={{ width: 30, height: 30 }}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Home;
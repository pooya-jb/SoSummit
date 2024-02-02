import { Pressable, Text, View, Image, AppState } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { useDispatch } from 'react-redux';
import { router } from 'expo-router';
import socket from '../../utils/socket';
import { setCoords } from '../../redux/userSlice';
import { styles } from './Home.styles';

const Home = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
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

  const [btnText, setBtnText] = useState<string>('Start');

  const dispatch = useDispatch();

  const getLocation = async (state: string) => {
    if (state === 'active') liveLocation();
    setInterval(liveLocation, 5000);
  };

  const liveLocation = async () => {
    let location = await Location.getCurrentPositionAsync({});
    dispatch(setCoords([location.coords.latitude, location.coords.longitude]));
    setLocation(location);
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

  useEffect(() => {
    // Subscribe to app state changes
    liveLocation()
    const appStateSubscription = AppState.addEventListener(
      'change',
      (state) => {
        console.log(state);
        getLocation(state);
      }
    );
    // Clean up subscription on component unmount
    return () => {
      
      appStateSubscription.remove();
    };
  }, []);

  const connectHandler = async () => {
    router.navigate('../Locations');
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
    if (location?.coords) {
      setMapRegion(userRegion);
    }
  };
  socket.on('msg', (msg) => console.log(msg));

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
          <Pressable
            onPress={connectHandler}
            style={({ pressed }) => [
              styles.button,
              { backgroundColor: pressed ? '#0A7F8C' : '#10B2C1' },
            ]}
          >
            <Text style={styles.buttonText}>{btnText}</Text>
          </Pressable>
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
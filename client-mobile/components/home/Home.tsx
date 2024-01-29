import { Pressable, ScrollView, Text, View, Image } from 'react-native';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useEffect, useState } from 'react';
import WebView from 'react-native-webview';
import * as Location from 'expo-location';
import { Coordinates } from '../../utils/types';

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

  const [btnText, setBtnText] = useState<string>('Start!');

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      console.log(location);
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
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const startHanlder = () => {
    console.log('Start BTN clicked!');
    setBtnText('End!');
  };

  const regionChangeHandler = (newRegion: any) => {
    console.log(newRegion);
    if (newRegion) {
      setMapRegion({
        latitude: newRegion.latitude,
        longitude: newRegion.longitude,
        latitudeDelta: newRegion.latitudeDelta,
        longitudeDelta: newRegion.longitudeDelta,
      });
    }
  };

  const currentLocationHanlder = () => {
    console.log('Current location clicked!');
    console.log(location);
    if (location?.coords) {
      setMapRegion(userRegion);
    }
  };

  return (
    <View style={styles.home}>
      <Text>Your location was sent to the resort 2 minutes ago!</Text>

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
            onPress={startHanlder}
            style={({ pressed }) => [
              styles.button,
              { backgroundColor: pressed ? '#0A7F8C' : '#10B2C1' }, // Change color on press
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
            onPress={currentLocationHanlder}
          >
            <Text style={{ fontSize: 7 }}>Current Location!</Text>
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

const styles = StyleSheet.create({
  home: { height: '100%' },
  mapContainer: {
    width: '100%',
    height: '100%',
    borderColor: 'black',
  },
  map: {
    width: '100%',
    height: '100%',
    ...StyleSheet.absoluteFillObject,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 60,
    alignSelf: 'center',
  },
  button: {
    margin: 10,
    padding: 5,
    borderRadius: 50,
    backgroundColor: '#10B2C1',
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    elevation: 10,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 15,
    shadowColor: 'gray',
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
  },
  currentLocationBtnContainer: {
    borderWidth: 0.5,
    position: 'absolute',
    top: 20,
    right: 10,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: 5,
    backgroundColor: '#D6D3BF',
    overflow: 'hidden',
  },
});

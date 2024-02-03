import {
  View,
  Pressable,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

import { setLocation } from '../redux/userSlice';
import { addNotification, updateNotifications } from '../redux/locationSlice';
import socket, {checkResponse} from '../utils/socket';

export default function Locations() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const locations = useSelector((state: RootState) => state.location.locations);
  const coords = useSelector((state: RootState) => state.user.coords);

  const handleLocationClick = async (title: string) => {
    setLoading(true);
      dispatch(setLocation(title));
      const [x, y] = coords;
    // SHOULD ADD LOGIC 
    // socket.on('connect', onConnect);
    // socket.on('disconnect', onDisconnect);
      socket
        .connect()
        .timeout(5000)
        .emit(
          `Location-${title}`,
          { location: title, userCoords: [y, x] },
          checkResponse(setUserStart, alertOfNoResponse)
        );
  };

  function alertOfNoResponse() {
    Alert.alert(
      'Error',
      'Server did not respond. Please try again in one minute.',
      [
        {
          text: 'AyAy',
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
      router.navigate('../');
      socket.on(`${response.info.location}-notifications-received`, (info) => dispatch(addNotification(info)));
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

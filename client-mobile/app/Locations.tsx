import {
  View,
  Pressable,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Alert
} from 'react-native';
import { router } from 'expo-router';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useDispatch } from 'react-redux';
import { setLocation } from '../redux/userSlice';
import socket from '../utils/socket';
import { useState } from 'react';

export default function Locations() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const locations = useSelector((state: RootState) => state.location.locations);
  const coords = useSelector((state: RootState) => state.user.coords);
  const coordsMock = [7.7, 45.9]

  const handleLocationClick = async (title: string) => {
    dispatch(setLocation('Zermatt'));
    socket
    .connect()
    .timeout(5000)
    .emit(`Location-${title}`, title, coordsMock, checkResponse(setLocationState, null));
    setLoading(true);
  };


  function checkResponse(successHandler, errorHandler) {
    return (err, response) => {
      if (err) {
        console.log('server did not acknowledge');
        Alert.alert('Error', 'Server did not respond. Please try again in one minute.', [
          {
            text: 'Cancel',
            style: 'cancel'
          }
        ])
        setLoading(false);
        if (errorHandler) errorHandler();
      } else {
        if (successHandler) successHandler(response.status);
      }
      // return response.status
    }
  }

  function setLocationState (status) {
    if (status) {
      dispatch(setLocation(status));
      router.navigate('../');
    } else {
      Alert.alert('Error', 'You are not in a protected area. Please try again when you enter one.', [
        {
          text: 'Cancel',
          style: 'cancel'
        }
      ]);
    }
    setLoading(false);
  }

  // {
  //   userId: 'userId',
  //   coords: coords,
  // }

  type ItemProps = { title: string };
  const Item = ({ title }: ItemProps) => (
    <View style={styles.locationItem}>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: pressed ? '#669FA8' : '#C5FEFF' }, // Change color on press
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
          renderItem={({ item }) => <Item title={item.name} />}
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

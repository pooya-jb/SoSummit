import {
  View,
  Pressable,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
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
  const handleLocationClick = async (title: string) => {
    dispatch(setLocation('Zermatt'));
    console.log('fired');
    socket.connect();
    socket.emit(title, {
      userId: 'userId',
      coords: coords,
    });
    setLoading(true);
  };

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

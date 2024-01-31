import { View, Pressable, Text, StyleSheet, SafeAreaView, FlatList} from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useDispatch } from 'react-redux';
import { setLocation } from '../redux/userSlice';
import socket from '../utils/socket';

export default function Locations() {
  const dispatch = useDispatch()
  const locations = useSelector((state: RootState) => state.location.locations)
 
  const handleLocationClick = async () => {
    const location = [123, 123123]
    dispatch(setLocation('Zermatt'))
    console.log('fired')
    socket.connect()
    socket.emit('Zermatt', 'test')
  }

  type ItemProps = {title: string};
  const Item = ({title}: ItemProps) => (
    <View style={styles.locationItem}>
      <Pressable onPress={handleLocationClick}>
      <Text style={styles.locationName}>{title}</Text>
      </Pressable>
    </View>
  );

  return (
    <SafeAreaView style={styles.locationContainer}>
    <FlatList
      data={locations}
      renderItem={({item}) => <Item title={item.name} />}
    />
  </SafeAreaView>
    );
}

const styles = StyleSheet.create({
 locationContainer: {
  flex:1,
  alignItems: 'center',
 },
 locationItem: {
  margin: 10,
  borderWidth:1,
  borderColor: 'black',
  padding: 10,
  paddingLeft:30,
  paddingRight: 30,
  backgroundColor: '#BCD8C1',
  borderRadius:5
 },
 locationName: {
  fontSize: 20,
  textAlign: 'center'
 }
})
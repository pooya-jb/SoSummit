import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';

export default function User() {
  const dispatch = useDispatch();
  const isPresented = router.canGoBack();
  const notifications = useSelector((state: RootState) => state.location.notifications).slice().reverse()

  type ItemProps = { type: string, text: string, time: string };
  const Item = ({ type, text, time }: ItemProps) => (
    <View>
      <Text>{type}</Text>
      <Text style={styles.notificationText}>{text}</Text>
      <Text style={styles.notificationTime}>{time}</Text>
    </View>
  );

  return (
    <View style={styles.notifications}>
      {!isPresented && <Link href='../'></Link>}
      <StatusBar style='light' />
      <View style={styles.notificationContainer}>
        <FlatList
          data={notifications}
          renderItem={({ item }) => <Item type={item.type} text={item.text} time={item.time} />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  notifications: {
    flex: 1,
    alignItems: 'center',
    padding: 5,
    marginTop: 20,
  },
  notificationContainer: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 15,
    borderRadius: 5,
  },

  notificationText: { fontSize: 16 },
  notificationTime: {
    fontSize: 10,
    color: 'gray',
  },
});

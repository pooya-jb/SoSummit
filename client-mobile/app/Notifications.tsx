import { View, Text, StyleSheet, FlatList, Pressable, Button } from 'react-native';
import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

export default function User() {
  const isPresented = router.canGoBack();
  const notifications = useSelector((state: RootState) => state.location.notifications).slice().reverse()


  type ItemProps = { type: string, text: string, time: string };
  const Item = ({ type, text, time }: ItemProps) => (
    <View style={styles.notificationContainer}>
      <Text style={styles.notificationType}>{type}</Text>
      <Text style={styles.notificationText}>{text}</Text>
      <Text style={styles.notificationTime}>{(new Date(Number(time)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))}</Text>
    </View>
  );
  return (
    <View style={styles.notifications}>
      {!isPresented && <Link href='../'></Link>}
      <StatusBar style='light' />
      <View>
        <FlatList
          style={styles.notificationsList}
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
    gap: 1
  },
  notificationContainer: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: "white",
    overflow: "hidden"
  },
  notificationType: {
    backgroundColor: "#C8D8ED",
    padding: 5,
    borderBottomWidth: 1,
    borderColor: "gray",
    color: "gray",
    fontSize: 14,
    marginBottom: 2,
    paddingBottom: 5
  },
  notificationsList: {
    padding: 10,
    paddingRight: 40,
    paddingLeft: 40,
    gap: 1,
    width: 350
  },
  notificationText: {
    fontSize: 16,
  padding: 5},
  notificationTime: {
    padding: 4,
    fontSize: 10,
    color: 'gray',
    marginLeft: "auto"
  },
});

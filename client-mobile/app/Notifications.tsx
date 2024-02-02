import { View, Pressable, Text, StyleSheet } from 'react-native';
import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useDispatch } from 'react-redux';

export default function User() {
  const dispatch = useDispatch();
  const isPresented = router.canGoBack();

  return (
    <View style={styles.notifications}>
      {!isPresented && <Link href='../'></Link>}
      <StatusBar style='light' />
      <View style={styles.notificationContainer}>
        <Text style={styles.notificationText}>First notification</Text>
        <Text style={styles.notificationTime}>12:20</Text>
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

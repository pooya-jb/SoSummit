import { View, Pressable, Text, StyleSheet} from 'react-native';
import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { setAdmin, setAuth, setEmail, setLocation, setUsername, setAge, setExperience, setBio, socketConnected, tripStarted} from '../redux/userSlice';
import socket from '../utils/socket';


export default function User() {
  const dispatch = useDispatch()
  const isPresented = router.canGoBack();
  const handleLogout = () => {
    AsyncStorage.removeItem('AccessToken')
    dispatch(setAuth(false));
    dispatch(setLocation(''));
    dispatch(setAdmin(false));
    dispatch(setUsername(''));
    dispatch(setEmail(''));
    dispatch(setAge(''));
    dispatch(setExperience(''));
    dispatch(setBio(''));
    socket.disconnect();
    dispatch(socketConnected(false));
    dispatch(tripStarted(false));
    router.navigate('../');
  }
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {!isPresented && <Link href="../"></Link>}
      <StatusBar style="light" />
      <Pressable style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>
          Log out
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    textAlign: 'center',
    fontSize: 15,
  },

  button: {
    backgroundColor: 'transparent',
    padding: 10,
    paddingLeft: 30,
    paddingRight:30,
    borderRadius: 5,
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 1,
  },
})
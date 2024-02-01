import { View, Pressable, Text, StyleSheet} from 'react-native';
import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { setAuth } from '../redux/userSlice';


export default function User() {
  const dispatch = useDispatch()
  const isPresented = router.canGoBack();
  const handleLogout = () => {
    AsyncStorage.removeItem('AccessToken')
    dispatch(setAuth(false))
    router.navigate('../')
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
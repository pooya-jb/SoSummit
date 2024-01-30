import { useDispatch } from 'react-redux';
import { setAuth } from '../../redux/userSlice';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TextInputProps,
  Pressable,
} from 'react-native';
import { useState } from 'react';
import { fetchLogin } from '../../utils/AppService';

const LoginForm = ({ setAuthState }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const handleLoginPress = async () => {
    if (email === '' || password === '') throw alert('Fields are missing');
    const res = await fetchLogin(email, password);
    if (res.accessToken) {
      console.log('auth');
      dispatch(setAuth(true));
    } else throw alert('Email or password is incorrect');
  };

  const changeAuthState = () => {
    setAuthState('signup');
  };

  return (
    <View style={styles.formContainer}>
      <TextInput
        value={email}
        placeholder='Email'
        style={styles.formInput}
        onChangeText={setEmail}
      />
      <TextInput
        value={password}
        placeholder='Password'
        style={styles.formInput}
        onChangeText={setPassword}
      />

      <Pressable style={styles.formButton} onPress={handleLoginPress}>
        <Text style={styles.formButtonText}>Login</Text>
      </Pressable>
      <Pressable style={{}} onPress={changeAuthState}>
        <Text style={{}}>Don't have an account?</Text>
      </Pressable>
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  formContainer: {
    gap: 30,
    padding: 40,
    marginTop: 40,
  },

  formInput: {
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 1,
    padding: 10,
    fontSize: 20,
  },

  formButtonText: {
    textAlign: 'center',
    fontSize: 20,
  },

  formButton: {
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 5,
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 1,
  },
});

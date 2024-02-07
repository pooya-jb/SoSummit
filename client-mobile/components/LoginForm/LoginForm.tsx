import { useDispatch } from 'react-redux';
import {
  setAuth,
  userLoggedIn,
} from '../../redux/userSlice';
import {
  View,
  TextInput,
  Text,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { fetchLogin } from '../../utils/ApiService';
import { updateLocations } from '../../redux/locationSlice';
import { styles } from './LoginForm.styles';

const LoginForm = ({
  setAuthState,
}: {
  setAuthState: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const dispatch = useDispatch();
  const [emailForm, setEmailForm] = useState('');
  const [password, setPassword] = useState('');
  const handleLoginPress = async () => {
    if (emailForm === '' || password === '') throw alert('Fields are missing');
    const res = await fetchLogin(emailForm, password);
    if (typeof res.accessToken === 'string' && res.accessToken.length > 0) {
      try {
        await AsyncStorage.setItem('AccessToken', res.accessToken);
        const { username, email, phoneNumber, bio, experience } = res.userInfo;
        dispatch(userLoggedIn({ username, email, phoneNumber, bio, experience }))
        dispatch(updateLocations(res.locations));
      } catch (err) {
        console.log(err);
      }
    } else throw alert('Email or password is incorrect');
  };

  const changeAuthState = () => {
    setAuthState('signup');
  };
  const changeAuthStateAdmin = () => {
    setAuthState('admin');
  };

  const handleTapOutside = () => {
    Keyboard.dismiss();
  };
  return (
    <TouchableWithoutFeedback onPress={handleTapOutside}>
      <View style={styles.formContainer}>
        <TextInput
          value={emailForm}
          placeholder='Email'
          style={styles.formInput}
          onChangeText={setEmailForm}
        />
        <TextInput
          value={password}
          placeholder='Password'
          style={styles.formInput}
          onChangeText={setPassword}
          secureTextEntry={true}
        />

        <Pressable style={styles.formButton} onPress={handleLoginPress}>
          <Text style={styles.formButtonText}>Login</Text>
        </Pressable>
        <Pressable style={{}} onPress={changeAuthState}>
          <Text style={{}}>Don't have an account?</Text>
        </Pressable>
        <Pressable style={{}} onPress={changeAuthStateAdmin}>
          <Text style={{}}>I'm an admin</Text>
        </Pressable>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginForm;

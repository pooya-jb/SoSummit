import React from 'react';
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  Text,
  Platform,
  TouchableWithoutFeedback,
  Pressable,
  Keyboard,
} from 'react-native';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { fetchAdminLogin } from '../../utils/ApiService';
import {
  setAuth,
  setEmail,
  setLocation,
  setUsername,
  setAdmin
} from '../../redux/userSlice';
import { styles } from './LoginAdminForm.styles';

const KeyboardAvoidingComponent = ({
  setAuthState,
}: {
  setAuthState: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [email, setEmailForm] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleAdminLogin = async () => {
    if (email === '' || password === '') throw alert('Fields are missing');
    const res = await fetchAdminLogin(email, password);
    if (typeof res.accessToken === 'string' && res.accessToken.length > 0) {
      try {
        await AsyncStorage.setItem('AccessToken', res.accessToken);
        const { username, location, email } = res.userInfo;
        dispatch(setEmail(email));
        dispatch(setUsername(username));
        dispatch(setLocation(location));
        dispatch(setAdmin(true));
      } catch (err) {
        console.log(err);
      }
      dispatch(setAuth(true));
    } else throw alert('Email or password is incorrect');
  };
  const handleTapOutside = () => {
    Keyboard.dismiss();
  };
  const changeAuthState = () => {
    setAuthState('login');
  };
  return (
    <TouchableWithoutFeedback onPress={handleTapOutside}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{}}>
            <TextInput
              placeholder='Email'
              value={email}
              onChangeText={setEmailForm}
              style={styles.textInput}
            />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{}}>
            <TextInput
              placeholder='Password'
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
              style={styles.textInput}
            />
          </View>
        </TouchableWithoutFeedback>
        <View style={{}}>
          <Pressable style={styles.formButton} onPress={handleAdminLogin}>
            <Text style={styles.formButtonText}>Sign up</Text>
          </Pressable>
        </View>
        <Pressable style={{}} onPress={changeAuthState}>
          <Text style={{}}>I'm not admin</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default KeyboardAvoidingComponent;

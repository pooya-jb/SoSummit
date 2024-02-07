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
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { fetchSignup } from '../../utils/ApiService';
import {
  setAuth,
  setUsername,
  setPhoneNumber,
  setEmail,
  setBio,
  setExperience,
} from '../../redux/userSlice';
import { updateLocations } from '../../redux/locationSlice';
import { styles } from './SignupForm.styles';

const KeyboardAvoidingComponent = ({
  setAuthState,
}: {
  setAuthState: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [usernameForm, setUsernameForm] = useState('');
  const [emailForm, setEmailForm] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumberForm, setPhoneNumberForm] = useState('');
  const [experienceForm, setExperienceForm] = useState('');
  const [bioForm, setBioForm] = useState('');
  const dispatch = useDispatch();
  const experienceOptions = [
    { label: 'Beginner', value: 'beginner' },
    { label: 'Intermediate', value: 'intermediate' },
    { label: 'Expert', value: 'expert' },
  ];
  const changeAuthState = () => {
    setAuthState('login');
  };

  const handleSignUpPress = async () => {
    try {
      if (emailForm === '' || password === '') {
        throw new Error('Fields are missing');
      }

      const res = await fetchSignup(
        usernameForm,
        emailForm,
        password,
        phoneNumberForm,
        experienceForm,
        bioForm
      );
      if (res && res.accessToken) {
        await AsyncStorage.setItem('AccessToken', res.accessToken);
        dispatch(setAuth(true));
        dispatch(setUsername(usernameForm));
        dispatch(setEmail(emailForm));
        dispatch(setPhoneNumber(phoneNumberForm));
        dispatch(setBio(bioForm));
        dispatch(setExperience(experienceForm));
        dispatch(updateLocations(res.locations));
      } else {
        throw new Error('Email or password is incorrect');
      }
    } catch (error: any) {
      console.log(error.message);
      alert(error.message);
    }
  };

  const handleTapOutside = () => {
    Keyboard.dismiss();
  };
  return (
    <TouchableWithoutFeedback onPress={handleTapOutside}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}

        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <TextInput
              placeholder='Username'
              value={usernameForm}
              onChangeText={setUsernameForm}
              style={styles.textInput}
            />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <TextInput
              placeholder='Email'
              value={emailForm}
              onChangeText={setEmailForm}
              style={styles.textInput}
            />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <TextInput
              placeholder='Password'
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
              style={styles.textInput}
            />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <TextInput
              placeholder='PhoneNumber'
              value={phoneNumberForm}
              onChangeText={setPhoneNumberForm}
              keyboardType='numeric'
              style={styles.textInput}
            />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.picker}>
            <RNPickerSelect
              value={experienceForm}
              placeholder={{ label: 'Selected Experience', value: 'beginner' }}
              onValueChange={(value) => setExperienceForm(value)}
              items={experienceOptions}
            />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <TextInput
              placeholder='Bio'
              value={bioForm}
              onChangeText={setBioForm}
              multiline={true}
              numberOfLines={4}
              style={styles.textInput}
            />
          </View>
        </TouchableWithoutFeedback>
        <View style={{}}>
          <Pressable style={styles.formButton} onPress={handleSignUpPress}>
            <Text style={styles.formButtonText}>Sign up</Text>
          </Pressable>
        </View>
        <Pressable style={{ marginBottom: 25 }} onPress={changeAuthState}>
          <Text style={{}}>Have an account?</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default KeyboardAvoidingComponent;

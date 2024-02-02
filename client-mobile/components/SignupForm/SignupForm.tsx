import React from 'react';
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Text,
  Platform,
  TouchableWithoutFeedback,
  Pressable,
  Keyboard,
} from 'react-native';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import { fetchSignup } from '../../utils/ApiService';
import { setAuth, setLocation, setUsername, setAge, setEmail, setBio, setExperience } from '../../redux/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateLocations } from '../../redux/locationSlice';


const KeyboardAvoidingComponent = ({ setAuthState }: { setAuthState: React.Dispatch<React.SetStateAction<string>> }) => {
  const [usernameForm, setUsernameForm] = useState('');
  const [emailForm, setEmailForm] = useState('');
  const [password, setPassword] = useState('');
  const [ageForm, setAgeForm] = useState('');
  const [experienceForm, setExperienceForm] = useState('');
  const [bioForm, setBioForm] = useState('');
  const dispatch = useDispatch();
  const experienceOptions = [
    { label: 'Beginner', value: 'beginner' },
    {
      label: 'Intermediate',
      value: 'intermediate',
    },
    {
      label: 'Expert',
      value: 'expert',
    },
  ];
  const changeAuthState = () => {
    setAuthState('login');
  };

  const handleSignUpPress = async () => {
    try {
      if (emailForm === '' || password === '') {
        throw new Error('Fields are missing');
      }

      const res = await fetchSignup(usernameForm, emailForm, password, ageForm, experienceForm, bioForm);
      if (res && res.accessToken) {
        await AsyncStorage.setItem('AccessToken', res.accessToken);
        dispatch(setAuth(true));
        dispatch(setUsername(usernameForm))
        dispatch(setEmail(emailForm))
        dispatch(setAge(ageForm))
        dispatch(setBio(bioForm))
        dispatch(setExperience(experienceForm))
        dispatch(updateLocations(res.locations))
      } else {
        throw new Error('Email or password is incorrect');
      }
    } catch (error: any) {
      console.log(error.message);
      alert(error.message);
    }
  };

  const handleTapOutside = () => {
    Keyboard.dismiss()
  }
  return (
    <TouchableWithoutFeedback onPress={handleTapOutside} >

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <TextInput placeholder='Username' value={usernameForm} onChangeText={setUsernameForm} style={styles.textInput} />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <TextInput placeholder='Email' value={emailForm} onChangeText={setEmailForm} style={styles.textInput} />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <TextInput placeholder='Password' secureTextEntry={true} value={password} onChangeText={setPassword} style={styles.textInput} />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <TextInput placeholder='Age' value={ageForm} onChangeText={setAgeForm} keyboardType='numeric' style={styles.textInput} />
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
            <TextInput placeholder='Bio' value={bioForm} onChangeText={setBioForm} multiline={true} numberOfLines={4} style={styles.textInput} />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    padding: 40,
    marginTop: 10,
  },
  inner: {
    flex: 1,
  },
  textInput: {
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 1,
    padding: 10,
    fontSize: 16,

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
    marginBottom: 15
  },
  picker: {
    borderColor: 'black',
    borderWidth: 1,
    padding: 5

  }
});

export default KeyboardAvoidingComponent;

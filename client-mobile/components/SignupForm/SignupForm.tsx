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
import { fetchSignup } from '../../utils/AppService';
import { setAuth } from '../../redux/userSlice';


const KeyboardAvoidingComponent = ({ setAuthState }: {setAuthState: React.Dispatch<React.SetStateAction<string>>}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [experience, setExperience] = useState('');
  const [bio, setBio] = useState('');
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
    if (email === '' || password === '') throw alert('Fields are missing');
    const res = await fetchSignup(username, email, password, age, experience, bio);
    if (res.accessToken) {
      dispatch(setAuth(true));
    } else throw alert('Email or password is incorrect');
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <TextInput placeholder='Username' value={username} onChangeText={setUsername} style={styles.textInput} />
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <TextInput placeholder='Email' value={email} onChangeText={setEmail} style={styles.textInput} />
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <TextInput placeholder='Password' value={password} onChangeText={setPassword} style={styles.textInput} />
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <TextInput placeholder='Age' value={age} onChangeText={setAge} keyboardType='numeric' style={styles.textInput} />
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.picker}>
          <RNPickerSelect
            value={experience}
            placeholder={{ label: 'Selected Experience', value: 'beginer' }}
            onValueChange={(value) => setExperience(value)}
            items={experienceOptions}
          />
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <TextInput placeholder='Bio' value={bio} onChangeText={setBio} multiline={true} numberOfLines={4} style={styles.textInput} />
        </View>
      </TouchableWithoutFeedback>
      <View style={{}}>
      <Pressable style={styles.formButton} onPress={handleSignUpPress}>
        <Text style={styles.formButtonText}>Sign up</Text>
      </Pressable>
      </View>
      <Pressable style={{marginBottom:25}} onPress={changeAuthState}>
        <Text style={{}}>Have an account?</Text>
      </Pressable>
    </KeyboardAvoidingView>

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
    marginBottom:15
  },
  picker: {
    borderColor: 'black',
    borderWidth: 1,
    padding: 5

  }
});

export default KeyboardAvoidingComponent;

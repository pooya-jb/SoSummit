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
  KeyboardAvoidingView,
  Pressable,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
} from 'react-native';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useState } from 'react';
import { fetchLogin } from '../../utils/AppService';
import RNPickerSelect from 'react-native-picker-select';

const SignupForm = ({ setAuthState }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [experience, setExperience] = useState('');
  const [bio, setBio] = useState('');
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
    setAuthState('login');
  };
  const changeAuthStateToAdmin = () => {
    setAuthState('adminLogin');
  };

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

  return (
    <KeyboardAvoidingView
      style={styles.formContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TextInput
        value={username}
        placeholder='Username'
        style={styles.formInput}
        onChangeText={setUsername}
      />
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
      <TextInput
        value={age}
        placeholder='Age'
        style={styles.formInput}
        onChangeText={setAge}
        keyboardType='numeric'
      />
      <View
        style={{
          padding: 1,
          borderColor: 'black',
          borderWidth: 1,
        }}
      >
        <RNPickerSelect
          value={experience}
          placeholder={{ label: 'Selecet Experience', value: null }}
          onValueChange={(value) => setExperience(value)}
          items={experienceOptions}
          style={{}}
        />
      </View>
      {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{}}>
          <Text>Touch Here</Text>
        </View>
      </TouchableWithoutFeedback> */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <TextInput
            value={bio}
            placeholder='Bio'
            style={styles.formInput}
            onChangeText={setBio}
            multiline={true}
            numberOfLines={3}
          />
        </View>
      </TouchableWithoutFeedback>

      <Pressable style={styles.formButton} onPress={handleLoginPress}>
        <Text style={styles.formButtonText}>Sign up</Text>
      </Pressable>
      <Pressable style={{}} onPress={changeAuthState}>
        <Text style={{}}>Have an account?</Text>
      </Pressable>
      <Pressable style={{}} onPress={changeAuthStateToAdmin}>
        <Text style={{}}>Are you admin?</Text>
      </Pressable>
    </KeyboardAvoidingView>
  );
};

export default SignupForm;

const styles = StyleSheet.create({
  formContainer: {
    gap: 30,
    padding: 40,
    marginTop: 10,
    flex: 1,
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: 'space-around',
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
  textInput: {
    height: 40,
    borderColor: '#000000',
    borderBottomWidth: 1,
    marginBottom: 36,
  },
  btnContainer: {
    backgroundColor: 'white',
    marginTop: 12,
  },
  formInput: {
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
  },
});

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

const KeyboardAvoidingComponent = () => {
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
        <View style={styles.inner}>
          <RNPickerSelect
            value={experience}
            placeholder={{ label: 'Selecet Experience', value: null }}
            onValueChange={(value) => setExperience(value)}
            items={experienceOptions}
            style={{}}
          />
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <TextInput placeholder='Bio' value={bio} onChangeText={setBio} multiline={true} numberOfLines={4} style={styles.textInput} />
        </View>
      </TouchableWithoutFeedback>
      <View style={{}}>
      <Pressable style={styles.formButton} onPress={()=> console.log('test')}>
        <Text style={styles.formButtonText}>Sign up</Text>
      </Pressable>
      </View>
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
    marginBottom:25
  },
});

export default KeyboardAvoidingComponent;

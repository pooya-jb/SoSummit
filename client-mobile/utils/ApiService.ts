import Constants from 'expo-constants';
const localhostUrl = process.env.EXPO_PUBLIC_LOCALHOST_URL;
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchLogin = async (email: string, password: string) => {
  try {
    if (email === '' || password === '') throw Error();
    const res = await fetch(`${localhostUrl}/login-user`, {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchSignup = async (
  username: string,
  email: string,
  password: string,
  phoneNumber: string,
  experience: string,
  bio: string
) => {
  try {
    if (!email || !password || !username || !experience || !phoneNumber) throw Error();
    const res = await fetch(`${localhostUrl}/register-user`, {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password, phoneNumber, experience, bio }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const tokenValidation = async () => {
  try {
    const token = await AsyncStorage.getItem('AccessToken');
    if (!token) return false;
    const res = await fetch(`${localhostUrl}/authenticate`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${token}`,
      },
    });
    if (res.status === 200) {
      return await res.json();
    } else return false;
  } catch (error) {
    console.log(error);
  }
};

export const fetchAdminLogin = async (email: string, password: string) => {
  try {
    if (email === '' || password === '') throw Error();
    const res = await fetch(`${localhostUrl}/login-admin`, {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
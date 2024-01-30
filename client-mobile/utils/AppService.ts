import Constants from 'expo-constants';
const { manifest2 } = Constants;
const localhostUrl = process.env.EXPO_PUBLIC_LOCALHOST_URL;

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

export const fetchSignup = async (username: string, email: string, password: string, age: string, experience: string, bio: string) => {
  try {
    if (!email || !password || !username || !experience || !age ) throw Error();
    const res = await fetch(`${localhostUrl}/register-user`, {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({username, email, password, age, experience, bio }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

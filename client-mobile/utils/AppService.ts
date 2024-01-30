import Constants from "expo-constants";
const { manifest2 } = Constants;
const localhostUrl = process.env.EXPO_PUBLIC_LOCALHOST_URL


export const fetchLogin =  async (email: string, password: string) =>  {
  try {
    if(email === '' || password === '') throw Error()
    const res = await  fetch(`${localhostUrl}/login-user`,{
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({email, password}),
    })
    const data = await res.json()
    return data
  } catch (error) {
    console.log(error)
  }
}
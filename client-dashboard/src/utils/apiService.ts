import { useSelector } from "react-redux";
import { TypedResponse } from "../types";
import { RootState } from "../redux/store";

const BASE_URL = 'http://localhost:3000'

const apiService = {
  login : async (loginForm:{email : string, password: string}) : Promise<TypedResponse> => {
    return await fetch(`${BASE_URL}/login-admin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginForm),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },

  checkJWT: async (accessToken) => {
    return fetch(`${BASE_URL}/authenticate`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${accessToken}`
      },
    })
      .then((res) => res)
      .catch((err) => console.log(err));
  },
  register : async (registerForm:{email : string, password: string, username: string, location:string}) : Promise<TypedResponse> => {
    return await fetch(`${BASE_URL}/register-admin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registerForm),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },
  deleteNoot : async (time : string, location: string) : Promise<TypedResponse> => {
    const res = await fetch(`${BASE_URL}/delete-noot`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({time, location}),
    })
  return res
  },
}

export default apiService;

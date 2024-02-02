import { TypedResponse } from "../types";

const BASE_URL = 'http://localhost:3000'

const apiService = {
  login : async (loginForm:{email : string, password: string}) : Promise<TypedResponse> => {
    return await fetch(`${BASE_URL}/login-admin`, {
      method: 'POST',
      // credentials: 'include',
      // mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginForm),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },

  checkJWT: async (accessToken) => {
    return fetch(`${BASE_URL}/authenticate`, {
      method: 'GET',
      // credentials: 'include',
      // mode: 'cors',
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
      // credentials: 'include',
      // mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registerForm),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },

  invalidateJWT:  async (accessToken) => {
    
      // the following request should invalidate the token
      // return fetch(`${BASE_URL}/logout`, {
      //   method: 'POST',
      //   credentials: 'include',
      //   mode: 'cors',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Authorization: `Bearer ${tokenName}`,
      //   },
      // })
      //   .then((res) => res.json())
      //   .catch((err) => console.log(err));
  
  }
}

export default apiService;

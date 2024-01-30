import { TypedResponse } from "../types";

const BASE_URL = 'http://localhost:3000'

const apiService = {
  login : async (loginForm:{email : string, password: string}) : Promise<TypedResponse> => {
    return await fetch(`${BASE_URL}/login-admin`, {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginForm),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },

  checkJWT: async (accessToken) => {
    return fetch(`${BASE_URL}/authenticate`, {
      method: 'GET',
      credentials: 'include',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${accessToken}`
      },
    })
      .then((res) => res)
      .catch((err) => console.log(err));
  }
}

export default apiService;

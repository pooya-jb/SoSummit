import { TypedResponse, UserL } from "../types";

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

  checkJWT: async (accessToken : string) => {
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
  deleteAlert : async (username : string, location: string) : Promise<TypedResponse> => {
    const res = await fetch(`${BASE_URL}/delete-alert`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({username, location}),
    })
    return res
  },
  fetchUserInfo: async (username:string) => {
    try {
      const accessToken = localStorage.getItem('accessToken') 
      const res = await fetch(`${BASE_URL}/user-info/${username}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json', 'Authorization': `bearer ${accessToken}`},
      })
      if(res.ok) {
        return await res.json() as UserL
      }else throw Error()
    
  } catch (error) {
    return {}
  }
}
}
export default apiService;

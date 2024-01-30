const BASE_URL = 'http://localhost:3000'


const apiService = {
  login : async (loginForm:{email : string, password: string}) => {
    return await fetch(`${BASE_URL}/login-admin`, {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginForm),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  }
}

export default apiService;

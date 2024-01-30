const JWTUtil = {
  setter : (res) => {
    const { accessToken } = res;
    localStorage.setItem('accessToken', accessToken);
  }
}

export default JWTUtil;
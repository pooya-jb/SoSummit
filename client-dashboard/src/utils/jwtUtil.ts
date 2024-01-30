import { TypedResponse } from "../types";

const JWTUtil = {
  setter : (res: TypedResponse ) => {
    const { accessToken } = res;
    localStorage.setItem('accessToken', accessToken);
  },

  getter : () => {
    return localStorage.getItem('accessToken');
  }
}

export default JWTUtil;
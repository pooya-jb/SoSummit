import { TypedResponse } from "../types";

const JWTUtil = {
  setter : (res: TypedResponse ) => {
    const { accessToken } = res;
    localStorage.setItem('accessToken', accessToken);
  },

  getter : () => {
    return localStorage.getItem('accessToken');
  },
  
  destroyer : () => {
    localStorage.removeItem('accessToken');
  }

}

export default JWTUtil;
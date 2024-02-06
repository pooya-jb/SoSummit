export interface UserL {
  username: string;
  email: string;
  age: string;
  experience: string;
  bio?: string;
  location: string;
}

export interface DisplayS {
  drawerIsOpen: boolean;
  selectedUser: UserL | null;
  loginModalOpen: boolean;
  registerModalOpen: boolean;
  alertModalOpen: boolean;
}

export type ActiveAdminS = {
  username: string;
  coords: number[];
}

export interface LocationS {
  name: string;
  coordinates: number[];
  alerts: AlertS[];
  activeAdmins: ActiveAdminS[];
  admins: string[];
  displayCoords: number[];
  noots: NotificationS[]
}

export interface AlertS {
  username: string;
  time: string;
  type: string;
  location: number[];
}

export interface TypedResponse extends Response {
  error: string;
  accessToken: string;
  locationInfo : LocationInfo;
  userInfo : UserInfo;
}

export interface TypedLoginResponse extends Response {
  error: string;
  accessToken: string;
  locationInfo: LocationInfo;
  userInfo: UserInfo;
}

export interface LoginResponse {
  accessToken: string;
}

export interface NotificationS {
  type: string;
  text: string;
  time: string;
}

export interface LocationInfo { 
  alerts: AlertS[],
  admins: string[],
  coordinates: number[],
  notifications: NotificationS[],
  activeAdmins : ActiveAdminS[],
}

export interface UserInfo {
  location : string;
  username : string;
  email : string;
}

export interface SocketServerResponse {
  status: boolean;
  info: object | undefined;
}

export interface UserInfoI {
  username: string,
  email:string,
  age: string,
  experience:string
}
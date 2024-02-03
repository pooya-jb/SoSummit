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

export interface ActiveAdminS {
  username: string;
  coords: number[];
}

export interface LocationS {
  name: string;
  coordinates: number[];
  alerts: AlertS[];
  activeAdmins: ActiveAdminS[];
  admins: string[];
}

export interface AlertS {
  text: string;
  time: string;
  type: string;
  username: string;
  coords: number[];
}

export interface TypedResponse extends Response {
  error: string;
  accessToken: string;
}

export interface LoginResponse {
  accessToken: string;
}

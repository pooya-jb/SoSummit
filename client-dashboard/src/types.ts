export interface UserL {
  username: string,
  email: string,
  age: string,
  experience: string,
  bio?: string,
  location: string
}

export interface DisplayS {
  drawerIsOpen: boolean;
  selectedUser: UserL | null;
  loginModalOpen: boolean;
}

export interface LocationS {
  name: string,
  coordinates: number[],
  alerts: AlertS[],
  users: UserL[]
  admins: UserL[]
}

interface AlertS {
  text: string,
  time: string,
  type: string,
  location: number[]
}
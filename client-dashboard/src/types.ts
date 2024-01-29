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
}
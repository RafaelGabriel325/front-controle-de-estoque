export interface IUser {
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
  enable: boolean;
  username: string;
  fullName: string;
  password: string;
  ui?: string;
}

export default interface IUsers {
  id?: string;
  name: string;
  password: string;
  email: string;
  driver_license: string;
  isAdmin: boolean;
  avatar: string;
  created_at: Date;
  updated_at: Date;
}

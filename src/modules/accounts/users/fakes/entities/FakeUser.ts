import IUsers from "@modules/accounts/users/model/IUsers";
import { v4 as uuidV4 } from "uuid";

class FakeUser implements IUsers {
  id?: string;
  name: string;
  password: string;
  email: string;
  driver_license: string;
  isAdmin: boolean;
  avatar: string;
  created_at: Date;
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
    this.isAdmin = false;
  }
}

export { FakeUser };

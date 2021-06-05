import IUsers from "@modules/accounts/users/model/IUsers";

import {
  ICreateUserDTO,
  IUsersRepository,
} from "../../repositories/IUsersRepository";

class FakeUsersRepository implements IUsersRepository {
  findByEmail(email: string): Promise<IUsers> {
    throw new Error("Method not implemented.");
  }
  create({ name, email, password }: ICreateUserDTO): Promise<IUsers> {
    throw new Error("Method not implemented.");
  }
}

export { FakeUsersRepository };

import IUsers from "../../model/IUsers";
import {
  ICreateUserDTO,
  IUsersRepository,
} from "../../repositories/IUsersRepository";
import { FakeUser } from "../entities/FakeUser";

class FakeUsersRepository implements IUsersRepository {
  private users: FakeUser[] = [];

  public async findById(id: string): Promise<IUsers | undefined> {
    return this.users.find((user) => user.id === id);
  }

  public async save(user: IUsers): Promise<IUsers> {
    const findIndex = this.users.findIndex(
      (findUser) => findUser.id === user.id
    );

    this.users[findIndex] = user;

    return user;
  }

  public async findByEmail(email: string): Promise<IUsers | undefined> {
    return this.users.find((user) => user.email === email);
  }

  public async create({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<IUsers> {
    const user = new FakeUser();

    Object.assign(user, {
      name,
      email,
      password,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.users.push(user);

    return user;
  }
}

export { FakeUsersRepository };

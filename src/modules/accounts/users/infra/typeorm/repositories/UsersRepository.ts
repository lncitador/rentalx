import IUsers from "@modules/accounts/users/model/IUsers";
import {
  ICreateUserDTO,
  IUsersRepository,
} from "@modules/accounts/users/repositories/IUsersRepository";
import { getRepository, Repository } from "typeorm";

import { User } from "../entities/User";

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }
  public async findById(id: string): Promise<IUsers> {
    const user = await this.ormRepository.findOne({
      where: { id },
    });

    return user;
  }
  public async findByEmail(email: string): Promise<IUsers | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        email,
      },
    });
    return user;
  }

  public async create({
    name,
    email,
    password,
    driver_license,
  }: ICreateUserDTO): Promise<IUsers> {
    const user = this.ormRepository.create({
      name,
      email,
      password,
      driver_license,
    });

    await this.ormRepository.save(user);

    return user;
  }
}

export { UsersRepository };

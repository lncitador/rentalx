import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

import IHashProvider from "../providers/models/IHashProvider";
import IUsers from "../model/IUsers";
import { IUsersRepository } from "../repositories/IUsersRepository";

interface IRequest {
  name: string;
  email: string;
  password: string;
  driver_license: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("HashProvider")
    private hashProvider: IHashProvider
  ) {}

  public async execute({
    name,
    email,
    password,
    driver_license,
  }: IRequest): Promise<IUsers> {
    const userAlreadyExist = await this.usersRepository.findByEmail(email);

    if (userAlreadyExist) {
      throw new AppError("Email already exists!");
    }

    const hashedPassword = await this.hashProvider.generatehash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      driver_license,
    });

    return user;
  }
}

export { CreateUserService };

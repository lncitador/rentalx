import "reflect-metadata";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import Auth from "@config/Auth";
import IHashProvider from "@modules/accounts/users/providers/models/IHashProvider";
import { IUsersRepository } from "@modules/accounts/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    id: string;
    name: string;
  };
  token: string;
}

@injectable()
class CreateAuthenticateUserService {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository,

    @inject("HashProvider")
    private hashProvider: IHashProvider
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Email or password incorrect", 401);
    }

    const comparePassword = await this.hashProvider.compareHash(
      password,
      user.password
    );

    if (!comparePassword) {
      throw new AppError("Email or password incorrect", 401);
    }

    const { expiresIn, secret } = Auth.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    const response = {
      user: {
        id: user.id,
        name: user.name,
      },
      token,
    };

    return response;
  }
}

export { CreateAuthenticateUserService };

import IHashProvider from "@modules/accounts/users/model/IHashProvider";
import { IUsersRepository } from "@modules/accounts/users/repositories/IUsersRepository";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

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
      throw new Error("Email or password incorrect");
    }

    const comparePassword = await this.hashProvider.compareHash(
      password,
      user.password
    );

    if (!comparePassword) {
      throw new Error("Email or password incorrect");
    }

    const token = sign({}, "SECRETMD5HASH", {
      subject: user.id,
      expiresIn: "1d",
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

import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";
import IStorageProvider from "@shared/providers/models/IStorageProvider";

import IUsers from "../model/IUsers";
import { IUsersRepository } from "../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
  avatar_file: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}
  public async execute({ user_id, avatar_file }: IRequest): Promise<IUsers> {
    const user = await this.usersRepository.findById(user_id);

    console.log(user);

    if (!user) {
      throw new AppError("Only authenticated user can change avatar.", 401);
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
    }

    const filename = await this.storageProvider.saveFile(avatar_file);

    user.avatar = filename;

    await this.usersRepository.save(user);

    return user;
  }
}

export { UpdateUserAvatarService };

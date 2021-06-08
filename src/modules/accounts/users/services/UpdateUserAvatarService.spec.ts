import { AppError } from "@shared/errors/AppError";
import { FakeStorageProvider } from "@shared/providers/fakes/FakeStorageProvider";

import { FakeUsersRepository } from "../fakes/repositories/FakeUsersRepository";
import { UpdateUserAvatarService } from "./UpdateUserAvatarService";

let fakeUserRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;

let updateUserAvatarService: UpdateUserAvatarService;

describe("Update User Avatar", () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();

    updateUserAvatarService = new UpdateUserAvatarService(
      fakeUserRepository,
      fakeStorageProvider
    );
  });

  it("should be able update user avatar", async () => {
    const user = await fakeUserRepository.create({
      name: "Jonh Doe",
      email: "doedoe@mail.com",
      password: "123456",
      driver_license: "123456789",
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatar_file: "avatar.jpg",
    });

    expect(user.avatar).toBe("avatar.jpg");
  });

  it("should be able delete avatar if exist another avatar file", async () => {
    const user = await fakeUserRepository.create({
      name: "Jonh Doe",
      email: "doedoe@mail.com",
      password: "123456",
      driver_license: "123456789",
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatar_file: "avatar.jpg",
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatar_file: "newAvatar.jpg",
    });

    expect(user.avatar).toBe("newAvatar.jpg");
  });

  it("should not be able update avatar without unauthorization user", () => {
    expect(async () => {
      await updateUserAvatarService.execute({
        user_id: undefined,
        avatar_file: "avatar.jpg",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});

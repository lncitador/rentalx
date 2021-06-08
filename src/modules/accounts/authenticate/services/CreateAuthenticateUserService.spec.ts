import { FakeHashProvider } from "@modules/accounts/users/fakes/providers/FakeHashProvider";
import { FakeUsersRepository } from "@modules/accounts/users/fakes/repositories/FakeUsersRepository";
import { AppError } from "@shared/errors/AppError";

import { CreateAuthenticateUserService } from "./CreateAuthenticateUserService";

let fakeUserRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createAuthenticateUserService: CreateAuthenticateUserService;

describe("Authenticate User", () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createAuthenticateUserService = new CreateAuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider
    );
  });

  it("should be able authenticate user", async () => {
    await fakeUserRepository.create({
      name: "Jonh Doe",
      email: "doedoe@mail.com",
      password: "123456",
      driver_license: "123456789",
    });

    const authenticate = await createAuthenticateUserService.execute({
      email: "doedoe@mail.com",
      password: "123456",
    });

    expect(authenticate).toHaveProperty("token");
  });

  it("should not be possible to authenticate user with wrong email", async () => {
    await fakeUserRepository.create({
      name: "Jonh Doe",
      email: "doedoe@mail.com",
      password: "123456",
      driver_license: "123456789",
    });

    expect(async () => {
      await createAuthenticateUserService.execute({
        email: "doejoe@mail.com",
        password: "123456",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be possible to authenticate user with wrong password", async () => {
    await fakeUserRepository.create({
      name: "Jonh Doe",
      email: "doedoe@mail.com",
      password: "123456",
      driver_license: "123456789",
    });

    expect(async () => {
      await createAuthenticateUserService.execute({
        email: "doedoe@mail.com",
        password: "654321",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});

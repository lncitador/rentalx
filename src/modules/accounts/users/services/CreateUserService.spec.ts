import { AppError } from "@shared/errors/AppError";

import { FakeHashProvider } from "../fakes/providers/FakeHashProvider";
import { FakeUsersRepository } from "../fakes/repositories/FakeUsersRepository";
import { CreateUserService } from "./CreateUserService";

let fakeUserRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;

describe("Create User", () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider
    );
  });

  it("should be able create User", async () => {
    const user = {
      name: "Jonh Doe",
      email: "doedoe@mail.com",
      password: "123456",
      driver_license: "123456789",
    };

    const createdUser = await createUserService.execute(user);

    expect(createdUser).toHaveProperty("id");
  });

  it("should not be able to create a user if the email already exists", async () => {
    await createUserService.execute({
      name: "Jonh Doe",
      email: "doedoe@mail.com",
      password: "123456",
      driver_license: "123456789",
    });

    expect(async () => {
      await createUserService.execute({
        name: "Jonh Doe",
        email: "doedoe@mail.com",
        password: "123456",
        driver_license: "123456789",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});

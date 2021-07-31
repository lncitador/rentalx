import { FakeUsersRepository } from "@modules/accounts/users/fakes/repositories/FakeUsersRepository";
import { FakeCarsRepository } from "@modules/car/cars/fakes/repositories/FakeCarsRepository";
import { FakeCategoriesRepository } from "@modules/car/categories/fakes/repositories/FakeCategoriesRepository";
import { AppError } from "@shared/errors/AppError";

import { FakeRentalsRepository } from "../fakes/repositories/FakeRentalsRepository";
import { IRentalsDTO } from "../repositories/IRentalsRepository";
import { CreateRentalsService } from "./CreateRentalsService";

let fakeRentalsRepository: FakeRentalsRepository;
let fakeCarsRepository: FakeCarsRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeCategoriesRepository: FakeCategoriesRepository;
let createRentalsService: CreateRentalsService;

describe("Create Rental", () => {
  beforeEach(() => {
    fakeRentalsRepository = new FakeRentalsRepository();
    fakeCarsRepository = new FakeCarsRepository();
    fakeUsersRepository = new FakeUsersRepository();

    fakeCategoriesRepository = new FakeCategoriesRepository();

    createRentalsService = new CreateRentalsService(
      fakeRentalsRepository,
      fakeCarsRepository,
      fakeUsersRepository
    );
  });

  it("should be able to create a rental", async () => {
    const user = await fakeUsersRepository.create({
      name: "john doe",
      driver_license: "123456",
      email: "johndoe@mail.com",
      password: "12345",
    });

    const category = await fakeCategoriesRepository.create({
      name: "newCategory",
      description: "new Category description",
    });

    const car = await fakeCarsRepository.create({
      name: "carName",
      description: "description",
      brand: "newBrand",
      license_plate: "1234567",
      daily_rate: 24,
      fine_amount: 48,
      category_id: category.id,
    });

    const data: IRentalsDTO = {
      car_id: car.id,
      user_id: user.id,
      start_date: new Date(2021, 7, 1),
      end_date: new Date(2021, 7, 4),
      expected_return_date: new Date(2021, 7, 4),
      total: 200,
    };

    const rental = await createRentalsService.execute(data);

    expect(rental.car_id).toBe(car.id);
  });

  it("should not be able to create a rental with non-existent car", async () => {
    const user = await fakeUsersRepository.create({
      name: "john doe",
      driver_license: "123456",
      email: "johndoe@mail.com",
      password: "12345",
    });

    const data: IRentalsDTO = {
      car_id: "12345",
      user_id: user.id,
      start_date: new Date(2021, 7, 1),
      end_date: new Date(2021, 7, 4),
      expected_return_date: new Date(2021, 7, 4),
      total: 200,
    };

    expect(async () => {
      await createRentalsService.execute(data);
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a rent with non-existent user", async () => {
    const category = await fakeCategoriesRepository.create({
      name: "newCategory",
      description: "new Category description",
    });

    const car = await fakeCarsRepository.create({
      name: "carName",
      description: "description",
      brand: "newBrand",
      license_plate: "1234567",
      daily_rate: 24,
      fine_amount: 48,
      category_id: category.id,
    });

    const data: IRentalsDTO = {
      car_id: car.id,
      user_id: "12345",
      start_date: new Date(2021, 7, 1),
      end_date: new Date(2021, 7, 4),
      expected_return_date: new Date(2021, 7, 4),
      total: 200,
    };

    expect(async () => {
      await createRentalsService.execute(data);
    }).rejects.toBeInstanceOf(AppError);
  });
});

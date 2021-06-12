import { FakeCategoriesRepository } from "@modules/car/categories/fakes/repositories/FakeCategoriesRepository";
import { AppError } from "@shared/errors/AppError";

import { FakeCarsRepository } from "../fakes/repositories/FakeCarsRepository";
import { CreateCarService } from "./CreateCarService";

let fakeCategoriesRepository: FakeCategoriesRepository;
let fakeCarsRepository: FakeCarsRepository;
let createCarService: CreateCarService;

describe("Create Car", () => {
  beforeEach(() => {
    fakeCarsRepository = new FakeCarsRepository();
    fakeCategoriesRepository = new FakeCategoriesRepository();
    createCarService = new CreateCarService(
      fakeCarsRepository,
      fakeCategoriesRepository
    );
  });

  it("should be able create a new car", async () => {
    const category = await fakeCategoriesRepository.create({
      name: "newCategory",
      description: "new Category description",
    });

    const car = await createCarService.execute({
      name: "carName",
      description: "description",
      brand: "newBrand",
      license_plate: "1234567",
      daily_rate: 24,
      fine_amount: 48,
      category_id: category.id,
    });

    expect(car).toHaveProperty("id");
  });

  it("should be able to create car with available true by default", async () => {
    const category = await fakeCategoriesRepository.create({
      name: "newCategory",
      description: "new Category description",
    });

    const car = await createCarService.execute({
      name: "carName",
      description: "description",
      brand: "newBrand",
      license_plate: "1234567",
      daily_rate: 24,
      fine_amount: 48,
      category_id: category.id,
    });

    expect(car.available).toBe(true);
  });

  it("should not be able with license plate already used", async () => {
    const category = await fakeCategoriesRepository.create({
      name: "newCategory",
      description: "new Category description",
    });

    await createCarService.execute({
      name: "carName",
      description: "description",
      brand: "newBrand",
      license_plate: "1234567",
      daily_rate: 24,
      fine_amount: 48,
      category_id: category.id,
    });

    expect(async () => {
      await createCarService.execute({
        name: "carName",
        description: "description",
        brand: "newBrand",
        license_plate: "1234567",
        daily_rate: 24,
        fine_amount: 48,
        category_id: category.id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to register a car with invalid category id", async () => {
    expect(async () => {
      await createCarService.execute({
        name: "carName",
        description: "description",
        brand: "newBrand",
        license_plate: "1234567",
        daily_rate: 24,
        fine_amount: 48,
        category_id: "11111111111",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});

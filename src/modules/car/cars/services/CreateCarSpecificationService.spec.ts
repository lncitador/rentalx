import { FakeCategoriesRepository } from "@modules/car/categories/fakes/repositories/FakeCategoriesRepository";
import { FakeSpecificationRepository } from "@modules/car/specifications/fakes/repositories/FakeSpecificationRepository";
import { AppError } from "@shared/errors/AppError";

import { FakeCarsRepository } from "../fakes/repositories/FakeCarsRepository";
import { CreateCarSpecificationService } from "./CreateCarSpecificationService";

let fakeCategoriesRepository: FakeCategoriesRepository;
let fakeCarsRepository: FakeCarsRepository;
let fakeSpecificationRepository: FakeSpecificationRepository;
let createCarSpecificationService: CreateCarSpecificationService;

describe("Create Car Specification", () => {
  beforeEach(() => {
    fakeCategoriesRepository = new FakeCategoriesRepository();
    fakeCarsRepository = new FakeCarsRepository();
    fakeSpecificationRepository = new FakeSpecificationRepository();
    createCarSpecificationService = new CreateCarSpecificationService(
      fakeCarsRepository,
      fakeSpecificationRepository
    );
  });

  it("should be able to add new spefication to the car", async () => {
    const category = await fakeCategoriesRepository.create({
      name: "newCategory",
      description: "new Category description",
    });

    const specification = await fakeSpecificationRepository.create({
      name: "newSpecification",
      description: "new Specification description",
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

    const { specifications } = await createCarSpecificationService.execute({
      car_id: car.id,
      specification_id: specification.id,
    });

    expect(car).toHaveProperty("specifications");
    expect(specifications).toStrictEqual([specification]);
  });

  it("should not be able to add new spefication to non-exist car", async () => {
    const specification = await fakeSpecificationRepository.create({
      name: "newSpecification",
      description: "new Specification description",
    });

    expect(async () => {
      await createCarSpecificationService.execute({
        car_id: "1234567",
        specification_id: specification.id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to add new spefication to non-exist specification", async () => {
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

    expect(async () => {
      await createCarSpecificationService.execute({
        car_id: car.id,
        specification_id: "1234567",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});

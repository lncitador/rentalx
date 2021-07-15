import { FakeCategoriesRepository } from "@modules/car/categories/fakes/repositories/FakeCategoriesRepository";

import { FakeCarsRepository } from "../fakes/repositories/FakeCarsRepository";
import { ListCarsService } from "./ListCarsService";

let fakeCarsRepository: FakeCarsRepository;
let fakeCategoriesRepository: FakeCategoriesRepository;
let listCarsService: ListCarsService;

describe("List Cars", () => {
  beforeEach(() => {
    fakeCarsRepository = new FakeCarsRepository();
    fakeCategoriesRepository = new FakeCategoriesRepository();
    listCarsService = new ListCarsService(fakeCarsRepository);
  });

  it("should be able to list available cars", async () => {
    const category = await fakeCategoriesRepository.create({
      name: "newCategory",
      description: "new Category description",
    });

    const carName = await fakeCarsRepository.create({
      name: "carName",
      description: "description",
      brand: "newBrand",
      license_plate: "1234567",
      daily_rate: 24,
      fine_amount: 48,
      category_id: category.id,
    });

    const newCarName = await fakeCarsRepository.create({
      name: "newCarName",
      description: "description",
      brand: "newBrand",
      license_plate: "7654321",
      daily_rate: 30,
      fine_amount: 60,
      category_id: category.id,
    });

    const list = await listCarsService.execute({});

    expect(list).toEqual([carName, newCarName]);
  });

  it("should be able to list available cars by name", async () => {
    const category = await fakeCategoriesRepository.create({
      name: "newCategory",
      description: "new Category description",
    });

    const carName = await fakeCarsRepository.create({
      name: "carName",
      description: "description",
      brand: "newBrand",
      license_plate: "1234567",
      daily_rate: 24,
      fine_amount: 48,
      category_id: category.id,
    });

    const list = await listCarsService.execute({ name: carName.name });

    expect(list).toEqual([carName]);
  });

  it("should be able to list available cars by brand", async () => {
    const category = await fakeCategoriesRepository.create({
      name: "newCategory",
      description: "new Category description",
    });

    const carName = await fakeCarsRepository.create({
      name: "carName",
      description: "description",
      brand: "newBrand",
      license_plate: "1234567",
      daily_rate: 24,
      fine_amount: 48,
      category_id: category.id,
    });

    const list = await listCarsService.execute({ brand: carName.brand });

    expect(list).toEqual([carName]);
  });

  it("should be able to list available cars by category id", async () => {
    const category = await fakeCategoriesRepository.create({
      name: "newCategory",
      description: "new Category description",
    });

    const carName = await fakeCarsRepository.create({
      name: "carName",
      description: "description",
      brand: "newBrand",
      license_plate: "1234567",
      daily_rate: 24,
      fine_amount: 48,
      category_id: category.id,
    });

    const list = await listCarsService.execute({ category_id: category.id });

    expect(list).toEqual([carName]);
  });
});

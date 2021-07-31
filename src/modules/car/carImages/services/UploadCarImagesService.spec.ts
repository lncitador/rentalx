import { FakeCarsRepository } from "@modules/car/cars/fakes/repositories/FakeCarsRepository";
import { FakeCategoriesRepository } from "@modules/car/categories/fakes/repositories/FakeCategoriesRepository";
import { AppError } from "@shared/errors/AppError";

import { FakeCarImagesRepository } from "../fakes/repositories/FakeCarImagesRepository";
import { UploadCarImagesService } from "./UploadCarImagesService";

let fakeCarImagesRepository: FakeCarImagesRepository;
let fakeCarsRepository: FakeCarsRepository;
let fakeCategoriesRepository: FakeCategoriesRepository;
let uploadCarImagesService: UploadCarImagesService;

describe("Create Images Car", () => {
  beforeEach(() => {
    fakeCarImagesRepository = new FakeCarImagesRepository();
    fakeCarsRepository = new FakeCarsRepository();
    fakeCategoriesRepository = new FakeCategoriesRepository();
    uploadCarImagesService = new UploadCarImagesService(
      fakeCarImagesRepository,
      fakeCarsRepository
    );
  });

  it("should be able to add image to a existent car", async () => {
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

    const imageCar = await uploadCarImagesService.execute({
      car_id: car.id,
      images_name: ["name-image.jpg"],
    });

    expect(imageCar).toBe(["name-image.jpg"]);
  });

  it("should not be able to add image to a non-existent car", async () => {
    expect(async () => {
      await uploadCarImagesService.execute({
        car_id: "12345",
        images_name: ["name-image.jpg"],
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});

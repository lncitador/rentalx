import { AppError } from "@shared/errors/AppError";

import { FakeCategoriesRepository } from "../fakes/repositories/FakeCategoriesRepository";
import { CreateCategoryService } from "./CreateCategoryService";

let createCategory: CreateCategoryService;
let fakeCategoriesRepository: FakeCategoriesRepository;

describe("Create Category", () => {
  beforeEach(() => {
    fakeCategoriesRepository = new FakeCategoriesRepository();
    createCategory = new CreateCategoryService(fakeCategoriesRepository);
  });

  it("should be able to create a category", async () => {
    const category = {
      name: "4x4",
      description: "carro 4 x 4",
    };
    await createCategory.execute(category);

    const createdCategory = await fakeCategoriesRepository.findByName(
      category.name
    );

    expect(createdCategory).toHaveProperty("id");
  });
  it("should not be able to create a category if the name already exists", async () => {
    await createCategory.execute({
      name: "4x4",
      description: "carro 4 x 4",
    });
    expect(async () => {
      await createCategory.execute({
        name: "4x4",
        description: "carro 4 x 4",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});

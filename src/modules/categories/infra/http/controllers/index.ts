import { FakeCategoriesRepository } from "@modules/categories/fakes/repositories/FakeCategoriesRepository";
import { CreateCategoryService } from "@modules/categories/services/CreateCategoryService";
import { ImportCategoriesService } from "@modules/categories/services/ImportCategoriesService";
import { ListCategoriesService } from "@modules/categories/services/ListCategoriesService";

import { CategoriesRepository } from "../../typeorm/repositories/CategoriesRepository";
import CreateCategoryController from "./CreateCategoryController";
import ImportCategoriesController from "./ImportCategoriesController";
import ListCategoriesController from "./ListCategoriesController";

const fakeCategoriesRepository = FakeCategoriesRepository.getInstance();

const createCategoryController = (): CreateCategoryController => {
  const categoriesRepository = new CategoriesRepository();
  const createCategoryService = new CreateCategoryService(categoriesRepository);
  return new CreateCategoryController(createCategoryService);
};

const listCategoryController = (): ListCategoriesController => {
  const categoriesRepository = new CategoriesRepository();
  const listCategoriesService = new ListCategoriesService(categoriesRepository);
  return new ListCategoriesController(listCategoriesService);
};

const importCategoriesController = (): ImportCategoriesController => {
  const categoriesRepository = new CategoriesRepository();
  const importCategoriesService = new ImportCategoriesService(
    categoriesRepository
  );
  return new ImportCategoriesController(importCategoriesService);
};

export {
  createCategoryController,
  listCategoryController,
  importCategoriesController,
  fakeCategoriesRepository,
};

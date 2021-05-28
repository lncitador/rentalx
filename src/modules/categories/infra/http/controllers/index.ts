import { CategoriesRepository } from "@modules/categories/repositories/fakes/FakeCategoriesRepository";
import { CreateCategoryService } from "@modules/categories/services/CreateCategoryService";
import { ImportCategoriesService } from "@modules/categories/services/ImportCategoriesService";
import { ListCategoriesService } from "@modules/categories/services/ListCategoriesService";

import CreateCategoryController from "./CreateCategoryController";
import ImportCategoriesController from "./ImportCategoriesController";
import ListCategoriesController from "./ListCategoriesController";

const categoriesRepository = CategoriesRepository.getInstance();

const createCategoryService = new CreateCategoryService(categoriesRepository);
const createCategoryController = new CreateCategoryController(
  createCategoryService
);

const listCategoriesService = new ListCategoriesService(categoriesRepository);
const listCategoryController = new ListCategoriesController(
  listCategoriesService
);

const importCategoriesService = new ImportCategoriesService();
const importCategoriesController = new ImportCategoriesController(
  importCategoriesService
);

export {
  createCategoryController,
  listCategoryController,
  importCategoriesController,
};

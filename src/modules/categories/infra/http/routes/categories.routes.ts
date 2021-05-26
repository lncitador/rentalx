import { CategoriesRepository } from "@modules/categories/repositories/fakes/FakeCategoriesRepository";
import { CreateCategoryService } from "@modules/categories/services/CreateCategoryService";
import { Router } from "express";

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post("/", (request, response) => {
  const { name, description } = request.body;

  const createCategoryService = new CreateCategoryService(categoriesRepository);

  createCategoryService.execute({ name, description });

  return response.status(201).send();
});

categoriesRoutes.get("/", (request, response) => {
  return response.json(categoriesRepository.list());
});

export { categoriesRoutes };

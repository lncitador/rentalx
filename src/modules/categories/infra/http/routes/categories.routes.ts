import { Router } from "express";

import {
  createCategoryController,
  listCategoryController,
} from "../controllers";

const categoriesRoutes = Router();

categoriesRoutes.post("/", (request, response) => {
  return createCategoryController.handle(request, response);
});

categoriesRoutes.get("/", (request, response) => {
  listCategoryController.handle(request, response);
});

// categoriesRoutes.get("/", listCategoryController.handle);

export { categoriesRoutes };

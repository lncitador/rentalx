import { Router } from "express";
import multer from "multer";

import {
  createCategoryController,
  listCategoryController,
  importCategoriesController,
} from "../controllers";

const categoriesRouter = Router();

const upload = multer({
  dest: "./tmp",
});

categoriesRouter.post("/", (request, response) => {
  return createCategoryController.handle(request, response);
});

categoriesRouter.get("/", (request, response) => {
  return listCategoryController.handle(request, response);
});

categoriesRouter.post("/import", upload.single("file"), (request, response) => {
  return importCategoriesController.handle(request, response);
});
// categoriesRoutes.get("/", listCategoryController.handle);

export { categoriesRouter };

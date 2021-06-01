import { Router } from "express";
import multer from "multer";

import CreateCategoryController from "../controllers/CreateCategoryController";
import ImportCategoriesController from "../controllers/ImportCategoriesController";
import ListCategoriesController from "../controllers/ListCategoriesController";

const categoriesRouter = Router();

const createCategoryController = new CreateCategoryController();
const listCategoryController = new ListCategoriesController();
const importCategoriesController = new ImportCategoriesController();

const upload = multer({
  dest: "./tmp",
});

categoriesRouter.post("/", createCategoryController.handle);

categoriesRouter.get("/", listCategoryController.handle);

categoriesRouter.post(
  "/import",
  upload.single("file"),
  importCategoriesController.handle
);
// categoriesRoutes.get("/", listCategoryController.handle);

export { categoriesRouter };

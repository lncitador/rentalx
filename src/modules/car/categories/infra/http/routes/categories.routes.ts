import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/Upload";
import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";
import ensureAutheticated from "@shared/infra/http/middlewares/ensureAuthenticate";

import CreateCategoryController from "../controllers/CreateCategoryController";
import ImportCategoriesController from "../controllers/ImportCategoriesController";
import ListCategoriesController from "../controllers/ListCategoriesController";

const categoriesRouter = Router();

const createCategoryController = new CreateCategoryController();
const listCategoryController = new ListCategoriesController();
const importCategoriesController = new ImportCategoriesController();

const upload = multer(uploadConfig);

categoriesRouter.get("/", listCategoryController.handle);

categoriesRouter.use(ensureAutheticated, ensureAdmin);

categoriesRouter.post("/", createCategoryController.handle);

categoriesRouter.post(
  "/import",
  upload.single("file"),
  importCategoriesController.handle
);

export { categoriesRouter };

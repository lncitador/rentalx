import ensureAutheticated from "@modules/accounts/authenticate/infra/middlewares/ensureAuthenticate";
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

categoriesRouter.get("/", listCategoryController.handle);

categoriesRouter.use(ensureAutheticated);

categoriesRouter.post("/", createCategoryController.handle);

categoriesRouter.post(
  "/import",
  upload.single("file"),
  importCategoriesController.handle
);

export { categoriesRouter };

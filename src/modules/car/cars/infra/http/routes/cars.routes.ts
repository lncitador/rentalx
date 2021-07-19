import { Router } from "express";

import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";
import ensureAutheticated from "@shared/infra/http/middlewares/ensureAuthenticate";

import { CreateCarsController } from "../controllers/CreateCarsController";
import { CreateCarSpecificationController } from "../controllers/CreateCarSpecificationController";
import { ListAvailableCarsController } from "../controllers/ListAvailableController";

const carRouter = Router();

const createCarSpecificationController = new CreateCarSpecificationController();
const createCarsController = new CreateCarsController();
const listAvailableCarsController = new ListAvailableCarsController();

carRouter.get("/available", listAvailableCarsController.handle);

carRouter.post(
  "/",
  ensureAutheticated,
  ensureAdmin,
  createCarsController.handle
);

carRouter.post(
  "/specifications/:id",
  ensureAutheticated,
  ensureAdmin,
  createCarSpecificationController.handle
);

export { carRouter };

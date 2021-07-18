import { Router } from "express";

import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";
import ensureAutheticated from "@shared/infra/http/middlewares/ensureAuthenticate";

import { CreateCarsController } from "../controllers/CreateCarsController";
import { ListAvailableCarsController } from "../controllers/ListAvailableController";

const carRouter = Router();

const createCarsController = new CreateCarsController();
const listAvailableCarsController = new ListAvailableCarsController();

carRouter.get("/", listAvailableCarsController.handle);

carRouter.post(
  "/",
  ensureAutheticated,
  ensureAdmin,
  createCarsController.handle
);

export { carRouter };

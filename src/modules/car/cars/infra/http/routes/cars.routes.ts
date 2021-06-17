import { Router } from "express";

import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";
import ensureAutheticated from "@shared/infra/http/middlewares/ensureAuthenticate";

import { CreateCarsController } from "../controllers/CreateCarsController";

const carRouter = Router();

const createCarsController = new CreateCarsController();

carRouter.post(
  "/",
  ensureAutheticated,
  ensureAdmin,
  createCarsController.handle
);

export { carRouter };

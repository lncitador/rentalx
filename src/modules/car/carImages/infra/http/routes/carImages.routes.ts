import { Router } from "express";

import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";
import ensureAutheticated from "@shared/infra/http/middlewares/ensureAuthenticate";

import { CreateCarImagesController } from "../controllers/CreateCarImagesController";

const createCarImagesController = new CreateCarImagesController();

const carImagesRouter = Router();

carImagesRouter.post(
  "/",
  ensureAutheticated,
  ensureAdmin,
  createCarImagesController.handle
);

export { carImagesRouter };

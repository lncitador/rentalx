import { Router } from "express";

import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";
import ensureAutheticated from "@shared/infra/http/middlewares/ensureAuthenticate";

import CreateSpecificationController from "../controllers/CreateSpecificationController";

const createSpecificationController = new CreateSpecificationController();
const specificationsRouter = Router();

specificationsRouter.use(ensureAutheticated, ensureAdmin);

specificationsRouter.post("/", createSpecificationController.handle);

export { specificationsRouter };

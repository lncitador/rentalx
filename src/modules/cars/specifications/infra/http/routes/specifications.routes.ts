import ensureAutheticated from "@modules/accounts/authenticate/infra/middlewares/ensureAuthenticate";
import { Router } from "express";

import CreateSpecificationController from "../controllers/CreateSpecificationController";

const createSpecificationController = new CreateSpecificationController();
const specificationsRouter = Router();

specificationsRouter.use(ensureAutheticated);

specificationsRouter.post("/", createSpecificationController.handle);

export { specificationsRouter };

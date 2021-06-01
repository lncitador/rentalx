import { Router } from "express";

import CreateSpecificationController from "../controllers/CreateSpecificationController";

const createSpecificationController = new CreateSpecificationController();
const specificationsRouter = Router();

specificationsRouter.post("/", createSpecificationController.handle);

export { specificationsRouter };

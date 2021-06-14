import { Router } from "express";

import { CreateCarsController } from "../controllers/CreateCarsController";

const carRouter = Router();

const createCarsController = new CreateCarsController();

carRouter.post("/", createCarsController.handle);

export { carRouter };

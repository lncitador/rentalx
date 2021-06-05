import { Router } from "express";

import { CreateAuthenticateUserController } from "../controllers/CreateAuthenticateController";

const authenticateUserRouter = Router();

const createAuthenticateUserController = new CreateAuthenticateUserController();

authenticateUserRouter.post("/", createAuthenticateUserController.handle);

export { authenticateUserRouter };

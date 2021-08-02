import { Router } from "express";

import { CreateRentalsController } from "../controllers/CreateRentalsController";

const createRentalsController = new CreateRentalsController();

const rentalRouter = Router();

rentalRouter.post("/", createRentalsController.handle);

import { SpecificationRepository } from "@modules/specifications/repositories/fakes/FakeSpecificationRepository";
import { CreateSpecificationService } from "@modules/specifications/services/CreateSpecificationService";
import { Router } from "express";

const specificationsRouter = Router();
const specificationRepository = new SpecificationRepository();

specificationsRouter.post("/", (request, response) => {
  const { name, description } = request.body;
  const createSpecificationService = new CreateSpecificationService(
    specificationRepository
  );

  createSpecificationService.execute({ name, description });

  return response.status(201).send();
});

export { specificationsRouter };

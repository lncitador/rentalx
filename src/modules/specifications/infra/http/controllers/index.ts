import { SpecificationRepository } from "@modules/specifications/repositories/fakes/FakeSpecificationRepository";
import { CreateSpecificationService } from "@modules/specifications/services/CreateSpecificationService";

import CreateSpecificationController from "./CreateSpecificationController";

const specificationRepository = SpecificationRepository.getInstace();

const createSpecificationService = new CreateSpecificationService(
  specificationRepository
);
const createSpecificationController = new CreateSpecificationController(
  createSpecificationService
);

export { createSpecificationController };

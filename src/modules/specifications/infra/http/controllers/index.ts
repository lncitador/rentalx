import { FakeSpecificationRepository } from "@modules/specifications/fakes/repositories/FakeSpecificationRepository";
import { CreateSpecificationService } from "@modules/specifications/services/CreateSpecificationService";

import CreateSpecificationController from "./CreateSpecificationController";

const specificationRepository = FakeSpecificationRepository.getInstace();

const createSpecificationService = new CreateSpecificationService(
  specificationRepository
);
const createSpecificationController = new CreateSpecificationController(
  createSpecificationService
);

export { createSpecificationController };

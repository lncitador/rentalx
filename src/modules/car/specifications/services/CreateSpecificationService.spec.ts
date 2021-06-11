import { AppError } from "@shared/errors/AppError";

import { FakeSpecificationRepository } from "../fakes/repositories/FakeSpecificationRepository";
import { CreateSpecificationService } from "./CreateSpecificationService";

let fakeSpecificationRepository: FakeSpecificationRepository;
let createSpecificationService: CreateSpecificationService;

describe("Create Specification", () => {
  beforeEach(() => {
    fakeSpecificationRepository = new FakeSpecificationRepository();
    createSpecificationService = new CreateSpecificationService(
      fakeSpecificationRepository
    );
  });

  it("should be create a new specification", async () => {
    const specification = await createSpecificationService.execute({
      name: "test",
      description: "description test",
    });

    expect(specification).toHaveProperty("id");
  });

  it("should not be create a new specification if name already exist!", async () => {
    await createSpecificationService.execute({
      name: "test",
      description: "description test",
    });

    expect(async () => {
      await createSpecificationService.execute({
        name: "test",
        description: "description test",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});

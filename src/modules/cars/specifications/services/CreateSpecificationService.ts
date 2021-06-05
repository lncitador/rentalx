import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

import Specification from "../model/ISpecification";
import { ISpecificationRepository } from "../repositories/ISpecificationRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationService {
  constructor(
    @inject("SpecificationRepository")
    private specificationRepository: ISpecificationRepository
  ) {}

  public async execute({
    name,
    description,
  }: IRequest): Promise<Specification> {
    const specificationAlreadyExist =
      await this.specificationRepository.findByName(name);

    if (specificationAlreadyExist) {
      throw new AppError("Specification already exist!");
    }

    const specification = await this.specificationRepository.create({
      name,
      description,
    });

    return specification;
  }
}

export { CreateSpecificationService };

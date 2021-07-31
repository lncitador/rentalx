import { inject, injectable } from "tsyringe";

import { ISpecificationRepository } from "@modules/car/specifications/repositories/ISpecificationRepository";
import { AppError } from "@shared/errors/AppError";

import ICars from "../model/ICars";
import { ICarsRepository } from "../repositories/ICarsRepository";

interface IRequest {
  car_id: string;
  specifications_id: string[];
}

@injectable()
class CreateCarSpecificationService {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,

    @inject("SpecificationRepository")
    private specificationRepository: ISpecificationRepository
  ) {}
  async execute({ car_id, specifications_id }: IRequest): Promise<ICars> {
    const carExists = await this.carsRepository.findById(car_id);
    if (!carExists) throw new AppError("car does not exists");

    const specifications = await this.specificationRepository.findByIds(
      specifications_id
    );

    if (!specifications[0]) throw new AppError("specification does not exists");

    carExists.specifications = specifications;

    const specificationCar = await this.carsRepository.save(carExists);

    return specificationCar;
  }
}

export { CreateCarSpecificationService };

import { inject } from "tsyringe";

import { ISpecificationRepository } from "@modules/car/specifications/repositories/ISpecificationRepository";
import { AppError } from "@shared/errors/AppError";

import ICars from "../model/ICars";
import { ICarsRepository } from "../repositories/ICarsRepository";

interface IRequest {
  car_id: string;
  specifications_id: string[];
}

class CreateCarSpecificationService {
  constructor(
    @inject("carsRepository")
    private carsRepository: ICarsRepository,

    @inject("specificationRepository")
    private specificationRepository: ISpecificationRepository
  ) {}
  async execute({ car_id, specifications_id }: IRequest): Promise<ICars> {
    const carExists = await this.carsRepository.findById(car_id);
    if (!carExists) throw new AppError("car does not exists");

    const specifications = await this.specificationRepository.findByIds(
      specifications_id
    );

    if (!specifications) throw new AppError("specification does not exists");

    carExists.specifications = specifications;

    console.log(carExists);

    const specificationCar = await this.carsRepository.save(carExists);

    return specificationCar;
  }
}

export { CreateCarSpecificationService };

import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "@modules/car/cars/repositories/ICarsRepository";
import { AppError } from "@shared/errors/AppError";

import ICarImages from "../model/ICarImages";
import { ICarImagesRepository } from "../repositories/ICarImagesRepository";

interface IRequest {
  car_id: string;
  image_name: string;
}

@injectable()
class CreateCarImagesService {
  constructor(
    @inject("CarImagesRepository")
    private carImagesRepository: ICarImagesRepository,

    @inject("CarImagesRepository")
    private carsRepository: ICarsRepository
  ) {}

  public async execute({ car_id, image_name }: IRequest): Promise<ICarImages> {
    const carExist = await this.carsRepository.findById(car_id);

    if (!carExist) {
      throw new AppError("Car not exists!");
    }

    const imageCar = await this.carImagesRepository.create({
      car_id,
      image_name,
    });

    return imageCar;
  }
}

export { CreateCarImagesService };

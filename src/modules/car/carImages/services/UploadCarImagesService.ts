import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "@modules/car/cars/repositories/ICarsRepository";
import { AppError } from "@shared/errors/AppError";

import { ICarImagesRepository } from "../repositories/ICarImagesRepository";

interface IRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
class UploadCarImagesService {
  constructor(
    @inject("CarImagesRepository")
    private carImagesRepository: ICarImagesRepository,

    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  public async execute({ car_id, images_name }: IRequest): Promise<IRequest> {
    const carExist = await this.carsRepository.findById(car_id);

    if (!carExist) {
      throw new AppError("Car not exists!");
    }

    images_name.map(async (image_name) => {
      await this.carImagesRepository.create({ car_id, image_name });
    });

    return {
      car_id,
      images_name,
    };
  }
}

export { UploadCarImagesService };

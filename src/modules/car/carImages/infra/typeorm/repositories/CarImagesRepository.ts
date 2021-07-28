import { getRepository, Repository } from "typeorm";

import ICarImages from "@modules/car/carImages/model/ICarImages";
import { ICarImagesRepository } from "@modules/car/carImages/repositories/ICarImagesRepository";

import { CarImages } from "../entities/CarImages";

class CarImagesRepository implements ICarImagesRepository {
  private ormRepository: Repository<CarImages>;

  constructor() {
    this.ormRepository = getRepository(CarImages);
  }

  public async create({
    car_id,
    image_name,
  }: {
    car_id: string;
    image_name: string;
  }): Promise<ICarImages> {
    const carImages = await this.ormRepository.create({
      car_id,
      image_name,
    });

    return carImages;
  }
}

export { CarImagesRepository };

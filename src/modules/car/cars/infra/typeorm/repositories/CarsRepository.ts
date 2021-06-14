import { getRepository, Repository } from "typeorm";

import ICars from "@modules/car/cars/model/ICars";
import {
  ICarsRepository,
  ICreateCarDRO,
} from "@modules/car/cars/repositories/ICarsRepository";

import { Cars } from "../entities/Cars";

class CarsRepository implements ICarsRepository {
  private ormRepository: Repository<Cars>;

  constructor() {
    this.ormRepository = getRepository(Cars);
  }
  public async create({
    name,
    description,
    license_plate,
    brand,
    daily_rate,
    fine_amount,
    category_id,
  }: ICreateCarDRO): Promise<ICars> {
    const car = this.ormRepository.create({
      name,
      description,
      license_plate,
      brand,
      daily_rate,
      fine_amount,
      category_id,
    });

    await this.ormRepository.save(car);

    return car;
  }
  public async findByPlate(license_plate: string): Promise<ICars | undefined> {
    const car = await this.ormRepository.findOne(license_plate);

    return car;
  }
}

export { CarsRepository };

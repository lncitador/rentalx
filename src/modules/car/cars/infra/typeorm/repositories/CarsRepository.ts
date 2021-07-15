import { getRepository, Repository } from "typeorm";

import ICars from "@modules/car/cars/model/ICars";
import {
  ICarsRepository,
  ICreateCarDTO,
} from "@modules/car/cars/repositories/ICarsRepository";

import { Cars } from "../entities/Cars";

class CarsRepository implements ICarsRepository {
  private ormRepository: Repository<Cars>;

  constructor() {
    this.ormRepository = getRepository(Cars);
  }
  public async findAvailable(
    name?: string,
    brand?: string,
    category_id?: string
  ): Promise<ICars[]> {
    const carsQuery = await this.ormRepository
      .createQueryBuilder("c")
      .where("available = :available", { available: true });

    if (name) {
      carsQuery.andWhere("c.name = :name", { name });
    }

    if (brand) {
      carsQuery.andWhere("c.brand = :brand", { brand });
    }

    if (category_id) {
      carsQuery.andWhere("c.category_id = :category_id", { category_id });
    }

    const cars = await carsQuery.getMany();

    return cars;
  }

  public async create({
    name,
    description,
    license_plate,
    brand,
    daily_rate,
    fine_amount,
    category_id,
  }: ICreateCarDTO): Promise<ICars> {
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
    const car = await this.ormRepository.findOne({
      where: { license_plate },
    });

    return car;
  }
}

export { CarsRepository };

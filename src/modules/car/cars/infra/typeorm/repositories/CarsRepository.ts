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

  public async save(car: ICars): Promise<ICars> {
    await this.ormRepository.save(car);

    return car;
  }

  public async findById(id: string): Promise<ICars> {
    const car = await this.ormRepository.findOne({
      where: { id },
    });

    return car;
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
      carsQuery.andWhere("name = :name", { name });
    }

    if (brand) {
      carsQuery.andWhere("brand = :brand", { brand });
    }

    if (category_id) {
      carsQuery.andWhere("category_id = :category_id", { category_id });
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

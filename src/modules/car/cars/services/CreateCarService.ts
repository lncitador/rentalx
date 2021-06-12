import { inject, injectable } from "tsyringe";

import { ICategoriesRepository } from "@modules/car/categories/repositories/ICategoriesRepository";
import { AppError } from "@shared/errors/AppError";

import ICars from "../model/ICars";
import { ICarsRepository } from "../repositories/ICarsRepository";

interface IRequest {
  id?: string;
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
}

@injectable()
class CreateCarService {
  constructor(
    @inject("")
    private carsRepository: ICarsRepository,

    @inject("")
    private categoriesRepository: ICategoriesRepository
  ) {}
  public async execute({
    name,
    description,
    license_plate,
    brand,
    daily_rate,
    fine_amount,
    category_id,
  }: IRequest): Promise<ICars> {
    const plateExist = await this.carsRepository.findByPlate(license_plate);

    if (plateExist) {
      throw new AppError("License plate already registed");
    }

    const categoryExist = await this.categoriesRepository.findById(category_id);

    if (!categoryExist) {
      throw new AppError("category doesn't exist");
    }

    const car = await this.carsRepository.create({
      name,
      description,
      brand,
      license_plate,
      category_id,
      daily_rate,
      fine_amount,
    });

    return car;
  }
}

export { CreateCarService };

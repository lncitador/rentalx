import { inject, injectable } from "tsyringe";

import ICars from "../model/ICars";
import { ICarsRepository } from "../repositories/ICarsRepository";

interface IFindAvailableRequest {
  name?: string;
  brand?: string;
  category_id?: string;
}

@injectable()
class ListAvailableCarsService {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}
  public async execute({
    name,
    brand,
    category_id,
  }: IFindAvailableRequest): Promise<ICars[]> {
    const cars = await this.carsRepository.findAvailable(
      name,
      brand,
      category_id
    );
    return cars;
  }
}

export { ListAvailableCarsService };

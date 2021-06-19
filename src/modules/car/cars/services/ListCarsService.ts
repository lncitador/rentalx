import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "../repositories/ICarsRepository";

@injectable()
class ListCarsService {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}
  public async execute(): Promise<void> {
    throw new Error("Nothing implemented");
  }
}

export { ListCarsService };

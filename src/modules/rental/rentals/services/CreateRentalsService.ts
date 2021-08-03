import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/users/repositories/IUsersRepository";
import { ICarsRepository } from "@modules/car/cars/repositories/ICarsRepository";
import { AppError } from "@shared/errors/AppError";

import IRentals from "../models/IRentals";
import {
  IRentalsDTO,
  IRentalsRepository,
} from "../repositories/IRentalsRepository";

@injectable()
class CreateRentalsService {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,

    @inject("CarsRepository")
    private carsRepository: ICarsRepository,

    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}
  public async execute({
    car_id,
    user_id,
    expected_return_date,
  }: IRentalsDTO): Promise<IRentals> {
    const carExist = await this.carsRepository.findById(car_id);

    if (!carExist) {
      throw new AppError("Car nothing exists!");
    }

    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(
      car_id
    );

    if (carUnavailable) {
      throw new AppError("Car is unavailable!");
    }

    const userExist = await this.usersRepository.findById(user_id);

    if (!userExist) {
      throw new AppError("User nothing exists!");
    }

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(
      user_id
    );

    if (rentalOpenToUser) {
      throw new AppError("There's a rental in progress for user!");
    }

    const rental = this.rentalsRepository.create({
      car_id,
      user_id,
      expected_return_date,
    });

    carExist.available = false;
    await this.carsRepository.save(carExist);

    return rental;
  }
}

export { CreateRentalsService };

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
    start_date,
    end_date,
    expected_return_date,
    total,
  }: IRentalsDTO): Promise<IRentals> {
    const carExist = await this.carsRepository.findById(car_id);
    if (!carExist) throw new AppError("Car nothing exists!");

    const userExist = await this.usersRepository.findById(user_id);
    if (!userExist) throw new AppError("User nothing exists!");

    const rental = this.rentalsRepository.create({
      car_id,
      user_id,
      start_date,
      end_date,
      expected_return_date,
      total,
    });

    return rental;
  }
}

export { CreateRentalsService };

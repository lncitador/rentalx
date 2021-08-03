import { getRepository, Repository } from "typeorm";

import IRentals from "@modules/rental/rentals/models/IRentals";
import {
  IRentalsDTO,
  IRentalsRepository,
} from "@modules/rental/rentals/repositories/IRentalsRepository";

import { Rentals } from "../entities/Rentals";

class RentalsRepository implements IRentalsRepository {
  private ormRepository: Repository<Rentals>;

  constructor() {
    this.ormRepository = getRepository(Rentals);
  }

  public async create({
    car_id,
    user_id,
    expected_return_date,
  }: IRentalsDTO): Promise<IRentals> {
    const rental = this.ormRepository.create({
      car_id,
      user_id,
      expected_return_date,
    });

    await this.ormRepository.save(rental);

    return rental;
  }

  public async findOpenRentalByCar(car_id: string): Promise<IRentals> {
    const openRentalByCar = await this.ormRepository.findOne({
      where: { car_id, end_date: null },
    });

    return openRentalByCar;
  }

  public async findOpenRentalByUser(user_id: string): Promise<IRentals> {
    const openRentalByUser = await this.ormRepository.findOne({
      where: { user_id },
    });

    return openRentalByUser;
  }
}

export { RentalsRepository };

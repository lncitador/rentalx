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
    start_date,
    end_date,
    expected_return_date,
    total,
  }: IRentalsDTO): Promise<IRentals> {
    const rental = this.ormRepository.create({
      car_id,
      user_id,
      start_date,
      end_date,
      expected_return_date,
      total,
    });

    await this.ormRepository.save(rental);

    return rental;
  }
}

export { RentalsRepository };

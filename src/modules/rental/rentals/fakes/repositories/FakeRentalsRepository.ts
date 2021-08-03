import IRentals from "../../models/IRentals";
import {
  IRentalsDTO,
  IRentalsRepository,
} from "../../repositories/IRentalsRepository";
import { FakeRentals } from "../entities/FakeRentals";

class FakeRentalsRepository implements IRentalsRepository {
  private rentals: IRentals[] = [];

  public async create({
    car_id,
    user_id,
    expected_return_date,
  }: IRentalsDTO): Promise<IRentals> {
    const rental = new FakeRentals();

    Object.assign(rental, {
      car_id,
      user_id,
      expected_return_date,
    });

    this.rentals.push(rental);

    return rental;
  }
}

export { FakeRentalsRepository };

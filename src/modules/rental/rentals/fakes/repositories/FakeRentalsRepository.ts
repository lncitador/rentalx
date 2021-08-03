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

  public async save(rental: IRentals): Promise<IRentals> {
    const rentIndex = this.rentals.findIndex((rent) => rent.id === rental.id);

    this.rentals[rentIndex] = rental;

    return rental;
  }

  public async findOpenRentalByCar(car_id: string): Promise<IRentals> {
    const openRentalByCar = this.rentals.find(
      (rental) => rental.car_id === car_id && !rental.end_date
    );

    return openRentalByCar;
  }

  public async findOpenRentalByUser(user_id: string): Promise<IRentals> {
    const openRentalByUser = this.rentals.find(
      (rental) => rental.user_id === user_id && !rental.end_date
    );

    return openRentalByUser;
  }
}

export { FakeRentalsRepository };

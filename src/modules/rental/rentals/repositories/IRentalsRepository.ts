import IRentals from "../models/IRentals";

interface IRentalsDTO {
  car_id: string;
  user_id: string;
  expected_return_date: Date;
}

interface IRentalsRepository {
  create({
    car_id,
    user_id,
    expected_return_date,
  }: IRentalsDTO): Promise<IRentals>;
  findOpenRentalByCar(car_id: string): Promise<IRentals>;
  findOpenRentalByUser(user_id: string): Promise<IRentals>;
}

export { IRentalsRepository, IRentalsDTO };

import IRentals from "../models/IRentals";

interface IRentalsDTO {
  car_id: string;
  user_id: string;
  start_date: Date;
  end_date: Date;
  expected_return_date: Date;
  total: number;
}

interface IRentalsRepository {
  create({
    car_id,
    user_id,
    start_date,
    end_date,
    expected_return_date,
    total,
  }: IRentalsDTO): Promise<IRentals>;
}

export { IRentalsRepository, IRentalsDTO };

import ICars from "../../model/ICars";
import {
  ICarsRepository,
  ICreateCarDRO,
} from "../../repositories/ICarsRepository";
import { FakeCar } from "../entities/FakeCar";

class FakeCarsRepository implements ICarsRepository {
  private cars: FakeCar[] = [];

  public async findByPlate(license_plate: string): Promise<ICars | undefined> {
    const car = this.cars.find((car) => car.license_plate === license_plate);

    return car;
  }

  public async create({
    name,
    description,
    license_plate,
    brand,
    daily_rate,
    fine_amount,
    category_id,
  }: ICreateCarDRO): Promise<ICars> {
    const car = new FakeCar();

    Object.assign(car, {
      name,
      description,
      license_plate,
      brand,
      daily_rate,
      fine_amount,
      category_id,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.cars.push(car);

    return car;
  }
}

export { FakeCarsRepository };

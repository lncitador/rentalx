import ICars from "../../model/ICars";
import {
  ICarsRepository,
  ICreateCarDTO,
} from "../../repositories/ICarsRepository";
import { FakeCar } from "../entities/FakeCar";

class FakeCarsRepository implements ICarsRepository {
  private cars: FakeCar[] = [];

  public async save(car: ICars): Promise<ICars> {
    const findIndex = this.cars.findIndex((findCar) => findCar.id === car.id);

    this.cars[findIndex] = car;

    return car;
  }

  public async findById(id: string): Promise<ICars> {
    const car = this.cars.find((car) => car.id === id);

    return car;
  }

  public async findAvailable(
    name?: string,
    brand?: string,
    category_id?: string
  ): Promise<ICars[]> {
    const carsAvailable = this.cars.filter((car) => car.available === true);

    if (name || brand || category_id) {
      return carsAvailable.filter(
        (car) =>
          car.name === name ||
          car.brand === brand ||
          car.category_id === category_id
      );
    }
    return carsAvailable;
  }

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
  }: ICreateCarDTO): Promise<ICars> {
    const car = new FakeCar();

    Object.assign(car, {
      name,
      description,
      license_plate,
      brand,
      daily_rate,
      fine_amount,
      category_id,
    });

    this.cars.push(car);

    return car;
  }
}

export { FakeCarsRepository };

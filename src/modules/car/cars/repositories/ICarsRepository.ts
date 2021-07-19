import ICars from "../model/ICars";

interface ICreateCarDTO {
  id?: string;
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
}

interface ICarsRepository {
  create({
    name,
    description,
    license_plate,
    brand,
    daily_rate,
    fine_amount,
    category_id,
  }: ICreateCarDTO): Promise<ICars>;
  findByPlate(license_plate: string): Promise<ICars | undefined>;
  findAvailable(
    name?: string,
    brand?: string,
    category_id?: string
  ): Promise<ICars[]>;
  findById(id: string): Promise<ICars>;
  save(car: ICars): Promise<ICars>;
}

export { ICarsRepository, ICreateCarDTO };

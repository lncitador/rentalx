import ICars from "../model/ICars";

interface ICreateCarDRO {
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
  }: ICreateCarDRO): Promise<ICars>;
}

export { ICarsRepository, ICreateCarDRO };

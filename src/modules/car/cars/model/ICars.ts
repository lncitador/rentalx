import Specification from "@modules/car/specifications/model/ISpecification";

export default interface ICars {
  id?: string;
  name: string;
  description: string;
  daily_rate: number;
  available: boolean;
  license_plate: string;
  fine_amount: number;
  brand: string;
  specifications: Specification[];
  category_id: string;
  created_at: Date;
  updated_at: Date;
}

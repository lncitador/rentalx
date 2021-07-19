import { v4 as uuidV4 } from "uuid";

import ISpecification from "@modules/car/specifications/model/ISpecification";

import ICars from "../../model/ICars";

class FakeCar implements ICars {
  id?: string;
  name: string;
  description: string;
  daily_rate: number;
  available: boolean;
  license_plate: string;
  fine_amount: number;
  brand: string;
  specifications: ISpecification[];
  category_id: string;
  created_at: Date;
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
      this.available = true;
      this.created_at = new Date();
      this.updated_at = new Date();
    }
  }
}

export { FakeCar };

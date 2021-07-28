import { v4 as uuidV4 } from "uuid";

import ICarImages from "../../model/ICarImages";

class FakeCarImages implements ICarImages {
  id?: string;
  car_id: string;
  image_name: string;
  created_at: Date;
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
      this.created_at = new Date();
      this.updated_at = new Date();
    }
  }
}

export { FakeCarImages };

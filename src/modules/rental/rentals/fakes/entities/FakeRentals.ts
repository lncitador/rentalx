import { v4 as uuidV4 } from "uuid";

import IRentals from "../../models/IRentals";

class FakeRentals implements IRentals {
  id: string;
  car_id: string;
  user_id: string;
  start_date: Date;
  end_date: Date;
  expected_return_date: Date;
  total: number;
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

export { FakeRentals };

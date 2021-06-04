import { v4 as uuidV4 } from "uuid";

import ICategory from "../../model/ICategory";

class FakeCategory implements ICategory {
  id?: string;
  name: string;
  description: string;
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { FakeCategory };

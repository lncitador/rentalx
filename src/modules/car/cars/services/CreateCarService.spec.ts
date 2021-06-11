import { FakeCarsRepository } from "../fakes/repositories/FakeCarsRepository";
import { CreateCarService } from "./CreateCarService";

let fakeCarsRepository: FakeCarsRepository;
let createCarService: CreateCarService;

describe("Create Car", () => {
  beforeEach(() => {
    fakeCarsRepository = new FakeCarsRepository();
    createCarService = new CreateCarService(fakeCarsRepository);
  });

  it("should be able create a new car", async () => {
    const car = await createCarService.execute({
      name: "carName",
      description: "description",
      brand: "newBrand",
      license_plate: "1234567",
      daily_rate: 24,
      fine_amount: 48,
      category_id: "11111111111",
    });

    expect(car).toHaveProperty("id");
  });
});

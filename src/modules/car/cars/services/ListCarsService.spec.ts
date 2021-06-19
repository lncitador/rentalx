import { FakeCarsRepository } from "../fakes/repositories/FakeCarsRepository";
import { ListCarsService } from "./ListCarsService";

let fakeCarsRepository: FakeCarsRepository;
let listCarsService: ListCarsService;

describe("List Cars", () => {
  beforeEach(() => {
    fakeCarsRepository = new FakeCarsRepository();
    listCarsService = new ListCarsService(fakeCarsRepository);
  });

  it("should list cars", async () => {
    const list = await listCarsService.execute();

    expect(list);
  });
});

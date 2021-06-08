import { FakeCategoriesRepository } from "../fakes/repositories/FakeCategoriesRepository";
import { ListCategoriesService } from "./ListCategoriesService";

let fakeCategoriesRepository: FakeCategoriesRepository;
let listCategoriesService: ListCategoriesService;

describe("List Categories", () => {
  beforeEach(() => {
    fakeCategoriesRepository = new FakeCategoriesRepository();
    listCategoriesService = new ListCategoriesService(fakeCategoriesRepository);
  });

  it("should be able list all categories", async () => {
    const SUV = await fakeCategoriesRepository.create({
      name: "SUV",
      description: "Sport utility",
    });

    const Hatch = await fakeCategoriesRepository.create({
      name: "Hatch",
      description: "Short car",
    });

    const listCategories = await listCategoriesService.execute();

    expect(listCategories).toEqual([SUV, Hatch]);
  });
});

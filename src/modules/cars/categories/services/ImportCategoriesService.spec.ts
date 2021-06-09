import { FakeCategoriesRepository } from "../fakes/repositories/FakeCategoriesRepository";
import { ImportCategoriesService } from "./ImportCategoriesService";

let fakeCategoriesRepository: FakeCategoriesRepository;
let importCategoriesService: ImportCategoriesService;

describe("Import Categories", () => {
  beforeEach(() => {
    fakeCategoriesRepository = new FakeCategoriesRepository();
    importCategoriesService = new ImportCategoriesService(
      fakeCategoriesRepository
    );
  });
});

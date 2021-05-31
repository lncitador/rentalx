import Category from "../model/ICategory";
import { ICategoriesRepository } from "../repositories/ICategoriesRepository";

class ListCategoriesService {
  constructor(private categoriesRepository: ICategoriesRepository) {}
  public execute(): Category[] {
    const all = this.categoriesRepository.list();

    return all;
  }
}

export { ListCategoriesService };

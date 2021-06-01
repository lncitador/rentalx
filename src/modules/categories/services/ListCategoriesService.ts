import Category from "../model/ICategory";
import { ICategoriesRepository } from "../repositories/ICategoriesRepository";

class ListCategoriesService {
  constructor(private categoriesRepository: ICategoriesRepository) {}
  public async execute(): Promise<Category[]> {
    const all = await this.categoriesRepository.list();

    return all;
  }
}

export { ListCategoriesService };

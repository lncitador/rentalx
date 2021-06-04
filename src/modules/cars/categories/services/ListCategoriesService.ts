import { inject, injectable } from "tsyringe";

import Category from "../model/ICategory";
import { ICategoriesRepository } from "../repositories/ICategoriesRepository";

@injectable()
class ListCategoriesService {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}
  public async execute(): Promise<Category[]> {
    const all = await this.categoriesRepository.list();

    return all;
  }
}

export { ListCategoriesService };

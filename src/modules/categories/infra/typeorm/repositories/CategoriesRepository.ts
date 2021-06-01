import ICategory from "@modules/categories/model/ICategory";
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "@modules/categories/repositories/ICategoriesRepository";
import { getRepository, Repository } from "typeorm";

import { Category } from "../entities/Category";

class CategoriesRepository implements ICategoriesRepository {
  private ormRepository: Repository<Category>;

  constructor() {
    this.ormRepository = getRepository(Category);
  }

  public async list(): Promise<ICategory[]> {
    const categories = await this.ormRepository.find();

    return categories;
  }

  public async create({
    description,
    name,
  }: ICreateCategoryDTO): Promise<ICategory> {
    const category = this.ormRepository.create({ name, description });

    await this.ormRepository.save(category);

    return category;
  }

  public async findByName(name: string): Promise<ICategory | undefined> {
    const categoryExist = await this.ormRepository.findOne({ name });

    return categoryExist;
  }
}

export { CategoriesRepository };

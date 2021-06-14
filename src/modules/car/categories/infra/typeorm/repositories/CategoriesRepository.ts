import { getRepository, Repository } from "typeorm";

import ICategory from "@modules/car/categories/model/ICategory";
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "@modules/car/categories/repositories/ICategoriesRepository";

import { Category } from "../entities/Category";

class CategoriesRepository implements ICategoriesRepository {
  private ormRepository: Repository<Category>;

  constructor() {
    this.ormRepository = getRepository(Category);
  }
  public async findById(id: string): Promise<ICategory | undefined> {
    const car = await this.ormRepository.findOne(id);

    return car;
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

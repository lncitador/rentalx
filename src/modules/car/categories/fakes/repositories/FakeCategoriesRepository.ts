import ICategory from "../../model/ICategory";
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "../../repositories/ICategoriesRepository";
import { FakeCategory } from "../entities/FakeCategory";

class FakeCategoriesRepository implements ICategoriesRepository {
  private categories: FakeCategory[] = [];

  public async findById(id: string): Promise<ICategory | undefined> {
    const category = this.categories.find((category) => category.id === id);

    return category;
  }

  public async create({
    name,
    description,
  }: ICreateCategoryDTO): Promise<FakeCategory> {
    const category = new FakeCategory();

    Object.assign(category, {
      name,
      description,
      created_at: new Date(),
    });

    this.categories.push(category);

    return category;
  }

  public async list(): Promise<FakeCategory[]> {
    return this.categories;
  }

  public async findByName(name: string): Promise<FakeCategory> {
    const category = this.categories.find((category) => category.name === name);
    return category;
  }
}

export { FakeCategoriesRepository };

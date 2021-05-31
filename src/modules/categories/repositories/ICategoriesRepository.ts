import Category from "../model/ICategory";

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

interface ICategoriesRepository {
  findByName(name: string): Category;
  list(): Category[];
  create({ description, name }: ICreateCategoryDTO): Category;
}

export { ICategoriesRepository, ICreateCategoryDTO };

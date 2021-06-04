import { UsersRepository } from "@modules/accounts/users/infra/typeorm/repositories/UsersRepository";
import { IUsersRepository } from "@modules/accounts/users/repositories/IUsersRepository";
import { CategoriesRepository } from "@modules/cars/categories/infra/typeorm/repositories/CategoriesRepository";
import { ICategoriesRepository } from "@modules/cars/categories/repositories/ICategoriesRepository";
import { SpecificationRepository } from "@modules/cars/specifications/infra/typeorm/repositories/SpecificationRepository";
import { ISpecificationRepository } from "@modules/cars/specifications/repositories/ISpecificationRepository";
import { container } from "tsyringe";

container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
);

container.registerSingleton<ISpecificationRepository>(
  "SpecificationRepository",
  SpecificationRepository
);

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

import { UsersRepository } from "@modules/accounts/users/infra/typeorm/repositories/UsersRepository";
import { IUsersRepository } from "@modules/accounts/users/repositories/IUsersRepository";
import { CategoriesRepository } from "@modules/car/categories/infra/typeorm/repositories/CategoriesRepository";
import { ICategoriesRepository } from "@modules/car/categories/repositories/ICategoriesRepository";
import { SpecificationRepository } from "@modules/car/specifications/infra/typeorm/repositories/SpecificationRepository";
import { ISpecificationRepository } from "@modules/car/specifications/repositories/ISpecificationRepository";
import { container } from "tsyringe";

import "@modules/accounts/users/providers";
import "@shared/providers";

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

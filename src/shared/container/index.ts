import { CategoriesRepository } from "@modules/categories/infra/typeorm/repositories/CategoriesRepository";
import { ICategoriesRepository } from "@modules/categories/repositories/ICategoriesRepository";
import { SpecificationRepository } from "@modules/specifications/infra/typeorm/repositories/SpecificationRepository";
import { ISpecificationRepository } from "@modules/specifications/repositories/ISpecificationRepository";
import { container } from "tsyringe";

container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
);

container.registerSingleton<ISpecificationRepository>(
  "SpecificationRepository",
  SpecificationRepository
);

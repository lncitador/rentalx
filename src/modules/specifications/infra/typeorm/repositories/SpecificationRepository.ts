import {
  ICreateSpecificationDTO,
  ISpecificationRepository,
} from "@modules/specifications/repositories/ISpecificationRepository";
import { getRepository, Repository } from "typeorm";

import { Specification } from "../entities/Specification";

class SpecificationRepository implements ISpecificationRepository {
  private ormRepository: Repository<Specification>;
  constructor() {
    this.ormRepository = getRepository(Specification);
  }
  public async findByName(name: string): Promise<Specification> {
    const specification = await this.ormRepository.findOne({ name });
    return specification;
  }

  public async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = this.ormRepository.create({
      name,
      description,
    });

    await this.ormRepository.save(specification);

    return specification;
  }
}

export { SpecificationRepository };

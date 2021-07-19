import { getRepository, Repository } from "typeorm";

import ISpecification from "@modules/car/specifications/model/ISpecification";
import {
  ICreateSpecificationDTO,
  ISpecificationRepository,
} from "@modules/car/specifications/repositories/ISpecificationRepository";

import { Specification } from "../entities/Specification";

class SpecificationRepository implements ISpecificationRepository {
  private ormRepository: Repository<Specification>;
  constructor() {
    this.ormRepository = getRepository(Specification);
  }

  public async findByIds(ids: string[]): Promise<ISpecification[]> {
    const specifications = await this.ormRepository.findByIds(ids);

    return specifications;
  }

  public async findById(id: string): Promise<ISpecification> {
    const specification = await this.ormRepository.findOne({ where: { id } });

    return specification;
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

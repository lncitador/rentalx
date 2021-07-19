import ISpecification from "../../model/ISpecification";
import {
  ICreateSpecificationDTO,
  ISpecificationRepository,
} from "../../repositories/ISpecificationRepository";
import { FakeSpecification } from "../entities/FakeSpecification";

class FakeSpecificationRepository implements ISpecificationRepository {
  private specifications: FakeSpecification[] = [];

  public async findById(id: string): Promise<ISpecification> {
    const specification = this.specifications.find(
      (specification) => specification.id === id
    );
    return specification;
  }

  public async findByName(name: string): Promise<FakeSpecification> {
    const specification = this.specifications.find(
      (specification) => specification.name === name
    );
    return specification;
  }

  public async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<FakeSpecification> {
    const specification = new FakeSpecification();

    Object.assign(specification, {
      name,
      description,
      created_at: new Date(),
    });

    this.specifications.push(specification);

    return specification;
  }
}

export { FakeSpecificationRepository };

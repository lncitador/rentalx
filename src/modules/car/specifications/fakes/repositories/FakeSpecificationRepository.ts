import {
  ICreateSpecificationDTO,
  ISpecificationRepository,
} from "../../repositories/ISpecificationRepository";
import { FakeSpecification } from "../entities/FakeSpecification";

class FakeSpecificationRepository implements ISpecificationRepository {
  private specifications: FakeSpecification[] = [];

  public async findByName(name: string): Promise<FakeSpecification> {
    const specification = this.specifications.find(
      (specification) => specification.name === name
    );
    return specification;
  }

  public async findByIds(ids: string[]): Promise<FakeSpecification[]> {
    const specifications = this.specifications.filter((specification) =>
      ids.includes(specification.id)
    );
    return specifications;
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

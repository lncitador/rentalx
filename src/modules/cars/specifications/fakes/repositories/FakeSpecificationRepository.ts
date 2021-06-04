import {
  ICreateSpecificationDTO,
  ISpecificationRepository,
} from "../../repositories/ISpecificationRepository";
import { FakeSpecification } from "../entities/FakeSpecification";

class FakeSpecificationRepository implements ISpecificationRepository {
  private specifications: FakeSpecification[];

  private static INSTANCE: FakeSpecificationRepository;

  private constructor() {
    this.specifications = [];
  }

  public static getInstace(): FakeSpecificationRepository {
    if (!FakeSpecificationRepository.INSTANCE) {
      FakeSpecificationRepository.INSTANCE = new FakeSpecificationRepository();
    }

    return FakeSpecificationRepository.INSTANCE;
  }

  findByName(name: string): FakeSpecification {
    const specification = this.specifications.find(
      (specification) => specification.name === name
    );
    return specification;
  }

  create({ name, description }: ICreateSpecificationDTO): FakeSpecification {
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

import Specification from "../model/ISpecification";

interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationRepository {
  findByName(name: string): Specification;
  create({ name, description }: ICreateSpecificationDTO): Specification;
}

export { ICreateSpecificationDTO, ISpecificationRepository };

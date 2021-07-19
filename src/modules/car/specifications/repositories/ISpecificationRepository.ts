import Specification from "../model/ISpecification";

interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationRepository {
  findById(id: string): Promise<Specification>;
  findByName(name: string): Promise<Specification>;
  create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification>;
}

export { ICreateSpecificationDTO, ISpecificationRepository };

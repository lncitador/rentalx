import IUsers from "../model/IUsers";

interface ICreateUserDTO {
  name: string;
  password: string;
  email: string;
  driver_license: string;
}

interface IUsersRepository {
  findById(id: string): Promise<IUsers>;
  findByEmail(email: string): Promise<IUsers | undefined>;
  create({
    name,
    email,
    password,
    driver_license,
  }: ICreateUserDTO): Promise<IUsers>;
  save(user: IUsers): Promise<IUsers>;
}

export { IUsersRepository, ICreateUserDTO };

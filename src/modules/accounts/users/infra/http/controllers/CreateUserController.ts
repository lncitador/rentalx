import { CreateUserService } from "@modules/accounts/users/services/CreateUserService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class CreateUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password, driver_license } = request.body;

    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute({
      name,
      email,
      password,
      driver_license,
    });

    return response.status(201).json({ user });
  }
}

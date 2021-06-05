import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateAuthenticateUserService } from "../../services/CreateAuthenticateUserService";

class CreateAuthenticateUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createSession = container.resolve(CreateAuthenticateUserService);

    try {
      const authenticateUser = await createSession.execute({ email, password });

      return response.status(201).json(authenticateUser);
    } catch (error) {
      return response.status(401).json({ error: error.message });
    }
  }
}

export { CreateAuthenticateUserController };

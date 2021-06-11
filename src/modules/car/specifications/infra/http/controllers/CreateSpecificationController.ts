import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateSpecificationService } from "@modules/car/specifications/services/CreateSpecificationService";

export default class CreateSpecificationController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    const createSpecificationService = container.resolve(
      CreateSpecificationService
    );

    const specification = await createSpecificationService.execute({
      name,
      description,
    });

    return response.status(201).json({ specification });
  }
}

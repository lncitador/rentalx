import { CreateSpecificationService } from "@modules/cars/specifications/services/CreateSpecificationService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class CreateSpecificationController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    const createSpecificationService = container.resolve(
      CreateSpecificationService
    );

    try {
      const specification = await createSpecificationService.execute({
        name,
        description,
      });

      return response.status(201).json({ specification });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

import { CreateSpecificationService } from "@modules/specifications/services/CreateSpecificationService";
import { Request, Response } from "express";

export default class CreateSpecificationController {
  constructor(private createSpecificationService: CreateSpecificationService) {}

  public handle(request: Request, response: Response): Response {
    const { name, description } = request.body;

    const specification = this.createSpecificationService.execute({
      name,
      description,
    });

    return response.status(201).json({ specification });
  }
}

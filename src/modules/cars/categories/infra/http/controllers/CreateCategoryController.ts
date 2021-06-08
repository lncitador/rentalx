import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCategoryService } from "@modules/cars/categories/services/CreateCategoryService";

export default class CreateCategoryController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    const createCategoryService = container.resolve(CreateCategoryService);
    const category = await createCategoryService.execute({
      name,
      description,
    });

    return response.status(201).json(category);
  }
}

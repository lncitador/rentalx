import { CreateCategoryService } from "@modules/cars/categories/services/CreateCategoryService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class CreateCategoryController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    const createCategoryService = container.resolve(CreateCategoryService);

    try {
      const category = await createCategoryService.execute({
        name,
        description,
      });

      return response.status(201).json(category);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

import { CreateCategoryService } from "@modules/categories/services/CreateCategoryService";
import { Request, Response } from "express";

export default class CreateCategoryController {
  constructor(private createCategoryService: CreateCategoryService) {}

  public handle(request: Request, response: Response): Response {
    const { name, description } = request.body;

    const category = this.createCategoryService.execute({
      name,
      description,
    });

    return response.status(201).json({ category });
  }
}

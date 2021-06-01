import { ListCategoriesService } from "@modules/categories/services/ListCategoriesService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class ListCategoriesController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const listCategoriesService = container.resolve(ListCategoriesService);
    const categories = await listCategoriesService.execute();
    return response.json({ categories });
  }
}

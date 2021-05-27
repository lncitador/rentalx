import { ListCategoriesService } from "@modules/categories/services/ListCategoriesService";
import { Request, Response } from "express";

export default class ListCategoriesController {
  constructor(private listCategoriesService: ListCategoriesService) {}

  public async handle(request: Request, response: Response): Promise<Response> {
    const categories = await this.listCategoriesService.execute();
    return response.json({ categories });
  }
}

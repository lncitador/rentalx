import { ImportCategoriesService } from "@modules/categories/services/ImportCategoriesService";
import { Request, Response } from "express";

export default class ImportCategoriesController {
  constructor(private importCategoriesService: ImportCategoriesService) {}
  public handle(request: Request, response: Response): Response {
    const { file } = request;

    this.importCategoriesService.execute(file);

    return response.send();
  }
}

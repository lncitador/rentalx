import { ImportCategoriesService } from "@modules/categories/services/ImportCategoriesService";
import { Request, Response } from "express";

export default class ImportCategoriesController {
  constructor(private importCategoriesService: ImportCategoriesService) {}
  public async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request;

    await this.importCategoriesService.execute(file);

    return response.send();
  }
}

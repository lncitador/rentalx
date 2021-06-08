import { Request, Response } from "express";
import { container } from "tsyringe";

import { ImportCategoriesService } from "@modules/cars/categories/services/ImportCategoriesService";

export default class ImportCategoriesController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request;

    const importCategoriesService = container.resolve(ImportCategoriesService);

    await importCategoriesService.execute(file);

    return response.send();
  }
}

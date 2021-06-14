import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCarService } from "@modules/car/cars/services/CreateCarService";

class CreateCarsController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const {
      name,
      description,
      license_plate,
      brand,
      daily_rate,
      fine_amount,
      category_id,
    } = request.body;

    const createCarsService = container.resolve(CreateCarService);

    const car = await createCarsService.execute({
      name,
      description,
      license_plate,
      brand,
      daily_rate,
      fine_amount,
      category_id,
    });

    return response.status(201).json(car);
  }
}

export { CreateCarsController };

import { Request, Response } from "express";
import { container } from "tsyringe";

import { IRentalsDTO } from "@modules/rental/rentals/repositories/IRentalsRepository";
import { CreateRentalsService } from "@modules/rental/rentals/services/CreateRentalsService";

class CreateRentalsController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { car_id, user_id, expected_return_date }: IRentalsDTO = request.body;

    const rentalRepository = container.resolve(CreateRentalsService);

    const rental = await rentalRepository.execute({
      car_id,
      user_id,
      expected_return_date,
    });

    return response.status(201).json({ rental });
  }
}

export { CreateRentalsController };

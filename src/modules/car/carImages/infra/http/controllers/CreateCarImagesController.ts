import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCarImagesService } from "@modules/car/carImages/services/CreateCarImagesService";

class CreateCarImagesController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { car_id, image_name } = request.body;

    const createCarImagesService = container.resolve(CreateCarImagesService);

    const imagesCar = await createCarImagesService.execute({
      car_id,
      image_name,
    });

    return response.status(201).json({ imagesCar });
  }
}

export { CreateCarImagesController };

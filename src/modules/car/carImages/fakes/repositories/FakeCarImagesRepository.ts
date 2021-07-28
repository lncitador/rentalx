import ICarImages from "../../model/ICarImages";
import { ICarImagesRepository } from "../../repositories/ICarImagesRepository";
import { FakeCarImages } from "../entities/FakeCarImages";

class FakeCarImagesRepository implements ICarImagesRepository {
  private carImagesArray: FakeCarImages[] = [];

  public async create({
    car_id,
    image_name,
  }: {
    car_id: string;
    image_name: string;
  }): Promise<ICarImages> {
    const carImages = new FakeCarImages();

    Object.assign(carImages, {
      car_id,
      image_name,
    });

    this.carImagesArray.push(carImages);

    return carImages;
  }
}

export { FakeCarImagesRepository };

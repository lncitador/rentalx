import ICarImages from "../model/ICarImages";

type CarImagesRequest = Pick<ICarImages, "car_id" | "image_name">;

interface ICarImagesRepository {
  create({ car_id, image_name }: CarImagesRequest): Promise<ICarImages>;
}

export { ICarImagesRepository };

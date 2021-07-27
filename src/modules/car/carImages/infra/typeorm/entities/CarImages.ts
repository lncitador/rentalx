import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import ICarImages from "@modules/car/carImages/model/ICarImages";

@Entity("car_images")
class CarImages implements ICarImages {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  car_id: string;

  @Column()
  image_name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export { CarImages };

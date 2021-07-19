import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import ICars from "@modules/car/cars/model/ICars";
import { Specification } from "@modules/car/specifications/infra/typeorm/entities/Specification";

@Entity("cars")
class Cars implements ICars {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column("integer")
  daily_rate: number;

  @Column("boolean")
  available: boolean;

  @Column()
  license_plate: string;

  @Column("integer")
  fine_amount: number;

  @Column()
  brand: string;

  @Column()
  category_id: string;

  @ManyToMany(() => Specification)
  @JoinTable({
    name: "specifications_cars",
    joinColumns: [{ name: "car_id" }],
    inverseJoinColumns: [{ name: "specification_id" }],
  })
  specifications: Specification[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export { Cars };

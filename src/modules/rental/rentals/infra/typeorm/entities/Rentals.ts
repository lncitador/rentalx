import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { Cars } from "@modules/car/cars/infra/typeorm/entities/Cars";
import IRentals from "@modules/rental/rentals/models/IRentals";

@Entity("rentals")
class Rentals implements IRentals {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @ManyToOne(() => Cars)
  @JoinColumn({ name: "car_id" })
  car: Cars;

  @Column()
  car_id: string;

  @Column()
  user_id: string;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column()
  expected_return_date: Date;

  @Column()
  total: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export { Rentals };

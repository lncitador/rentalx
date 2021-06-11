import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import ICars from "@modules/car/cars/model/ICars";

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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export { Cars };

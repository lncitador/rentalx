import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export default class CreateSpecificationCars1623363409197
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "specification_cars",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "car_id",
            type: "uuid",
            isNullable: true,
          },
          {
            name: "specification_id",
            type: "uuid",
            isNullable: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
    await queryRunner.createForeignKeys("specification_cars", [
      new TableForeignKey({
        name: "SpecificationCar",
        columnNames: ["car_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "cars",
      }),
      new TableForeignKey({
        name: "Specification",
        columnNames: ["specification_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "specifications",
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("specification_cars", "SpecificationCar");
    await queryRunner.dropForeignKey("specification_cars", "Specification");
    await queryRunner.dropTable("specification_cars");
  }
}

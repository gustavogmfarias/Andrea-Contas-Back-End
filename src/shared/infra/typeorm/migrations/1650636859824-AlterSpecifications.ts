import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterSpecifications1650636859824 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'specifications',
      'createdAt',
      new TableColumn({
        name: 'created_at',
        type: 'timestamp',
        default: 'now()',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'specifications',
      'created_at',
      new TableColumn({
        name: 'createdAt',
        type: 'timestamp',
        default: 'now()',
      }),
    );
  }
}

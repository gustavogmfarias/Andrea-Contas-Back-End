import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterTableUsersId1649189582957 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'users',
      'id',
      new TableColumn({
        name: 'id',
        type: 'uuid',
        isPrimary: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({ name: 'id', type: 'uuid', isPrimary: true }),
    );
  }
}

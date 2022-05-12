import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterUserAddAvatar1648472409486 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({ name: 'avatar', type: 'varchar', isNullable: true }), //o isnullable true signigica que a coluna pode ser nula.
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'avatar');
  }
}

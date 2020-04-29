import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export default class CreateUsers1587328092361 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',         
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'avatar',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'champions',
            type: 'varchar',
          },
          {
            name: 'routes',
            type: 'varchar',
          },
          {
            name: 'media',
            type: 'varchar',
          },
          {
            name: 'like',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'dislike',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'status',
            type: 'boolean',
            default: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users')
  }
}

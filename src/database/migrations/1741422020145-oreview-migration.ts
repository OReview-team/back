import type { MigrationInterface, QueryRunner } from 'typeorm';

export class OreviewMigration1741422020145 implements MigrationInterface {
  name = 'OreviewMigration1741422020145';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "refresh_token" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "refresh_token"`);
  }
}

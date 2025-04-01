import type { MigrationInterface, QueryRunner } from 'typeorm';

export class OreviewMigration1743512173855 implements MigrationInterface {
  name = 'OreviewMigration1743512173855';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "programs" DROP COLUMN "origin_country"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "programs" ADD "origin_country" character varying NOT NULL`,
    );
  }
}

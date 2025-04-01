import type { MigrationInterface, QueryRunner } from 'typeorm';

export class OreviewMigration1742632316970 implements MigrationInterface {
  name = 'OreviewMigration1742632316970';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "genres" ADD "program" character varying NOT NULL`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "genres"."program" IS 'TV OR MOVIE'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `COMMENT ON COLUMN "genres"."program" IS 'TV OR MOVIE'`,
    );
    await queryRunner.query(`ALTER TABLE "genres" DROP COLUMN "program"`);
  }
}

import type { MigrationInterface, QueryRunner } from 'typeorm';

export class OreviewMigration1743509497749 implements MigrationInterface {
  name = 'OreviewMigration1743509497749';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "programs" DROP COLUMN "origin_id"`);
    await queryRunner.query(
      `ALTER TABLE "programs" ADD "tmdb_program_id" integer NOT NULL`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "programs"."tmdb_program_id" IS 'TMDB에서 제공하는 id'`,
    );
    await queryRunner.query(
      `ALTER TABLE "programs" ADD "program_type" character varying NOT NULL`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "programs"."program_type" IS 'movie or tv'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `COMMENT ON COLUMN "programs"."program_type" IS 'movie or tv'`,
    );
    await queryRunner.query(
      `ALTER TABLE "programs" DROP COLUMN "program_type"`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "programs"."tmdb_program_id" IS 'TMDB에서 제공하는 id'`,
    );
    await queryRunner.query(
      `ALTER TABLE "programs" DROP COLUMN "tmdb_program_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "programs" ADD "origin_id" integer NOT NULL`,
    );
  }
}

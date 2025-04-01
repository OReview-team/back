import type { MigrationInterface, QueryRunner } from 'typeorm';

export class OreviewMigration1743242363569 implements MigrationInterface {
  name = 'OreviewMigration1743242363569';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "watch_providers" DROP COLUMN "origin_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "watch_providers" ADD "tmdb_provider_id" integer NOT NULL`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "watch_providers"."tmdb_provider_id" IS 'TMDB에서 제공하는 provider_id'`,
    );
    await queryRunner.query(
      `ALTER TABLE "watch_providers" ADD "logo_path" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "watch_providers" DROP COLUMN "logo_path"`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "watch_providers"."tmdb_provider_id" IS 'TMDB에서 제공하는 provider_id'`,
    );
    await queryRunner.query(
      `ALTER TABLE "watch_providers" DROP COLUMN "tmdb_provider_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "watch_providers" ADD "origin_id" integer NOT NULL`,
    );
  }
}

import type { MigrationInterface, QueryRunner } from 'typeorm';

export class OreviewMigration1742304592694 implements MigrationInterface {
  name = 'OreviewMigration1742304592694';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "genres" ADD "deleted_at" TIMESTAMP`);
    await queryRunner.query(
      `ALTER TABLE "watch_providers" ADD "deleted_at" TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "programs" ADD "deleted_at" TIMESTAMP`,
    );
    await queryRunner.query(`ALTER TABLE "reviews" ADD "deleted_at" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "users" ADD "deleted_at" TIMESTAMP`);
    await queryRunner.query(
      `ALTER TABLE "genres" ALTER COLUMN "updated_at" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "watch_providers" ALTER COLUMN "updated_at" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "programs" ALTER COLUMN "updated_at" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "reviews" ALTER COLUMN "updated_at" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "updated_at" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "updated_at" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "reviews" ALTER COLUMN "updated_at" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "programs" ALTER COLUMN "updated_at" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "watch_providers" ALTER COLUMN "updated_at" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "genres" ALTER COLUMN "updated_at" SET NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deleted_at"`);
    await queryRunner.query(`ALTER TABLE "reviews" DROP COLUMN "deleted_at"`);
    await queryRunner.query(`ALTER TABLE "programs" DROP COLUMN "deleted_at"`);
    await queryRunner.query(
      `ALTER TABLE "watch_providers" DROP COLUMN "deleted_at"`,
    );
    await queryRunner.query(`ALTER TABLE "genres" DROP COLUMN "deleted_at"`);
  }
}

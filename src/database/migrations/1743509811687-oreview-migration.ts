import type { MigrationInterface, QueryRunner } from 'typeorm';

export class OreviewMigration1743509811687 implements MigrationInterface {
  name = 'OreviewMigration1743509811687';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "programs" DROP COLUMN "vote_average"`,
    );
    await queryRunner.query(
      `ALTER TABLE "programs" ADD "vote_average" double precision`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "programs"."vote_average" IS '평균 평점'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `COMMENT ON COLUMN "programs"."vote_average" IS '평균 평점'`,
    );
    await queryRunner.query(
      `ALTER TABLE "programs" DROP COLUMN "vote_average"`,
    );
    await queryRunner.query(
      `ALTER TABLE "programs" ADD "vote_average" integer`,
    );
  }
}

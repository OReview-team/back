import type { MigrationInterface, QueryRunner } from 'typeorm';

export class OreviewMigration1742282510531 implements MigrationInterface {
  name = 'OreviewMigration1742282510531';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "genres" 
      ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
      "created_at" TIMESTAMP NOT NULL DEFAULT now(), 
      "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
      "origin_id" integer NOT NULL,
      "name" character varying NOT NULL,CONSTRAINT "PK_80ecd718f0f00dde5d77a9be842" PRIMARY KEY ("id"));
      COMMENT ON COLUMN "genres"."origin_id" IS 'TMDB에서 제공하는 id'`,
    );

    await queryRunner.query(
      `CREATE TABLE "watch_providers" 
      ("id" uuid NOT NULL DEFAULT uuid_generate_v4(),
       "created_at" TIMESTAMP NOT NULL DEFAULT now(),
       "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
       "origin_id" integer NOT NULL,
       "name" character varying NOT NULL,CONSTRAINT "PK_7cc37d40c703aec651723363ff5" PRIMARY KEY ("id"));
       COMMENT ON COLUMN "watch_providers"."origin_id" IS 'TMDB에서 제공하는 provider_id'`,
    );

    await queryRunner.query(
      `CREATE TABLE "programs" 
      ("id" uuid NOT NULL DEFAULT uuid_generate_v4(),
      "created_at" TIMESTAMP NOT NULL DEFAULT now(),
      "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
      "origin_id" integer NOT NULL,
      "name" character varying NOT NULL,
      "overview" character varying NOT NULL,
      "origin_country" character varying NOT NULL,
      "origin_name" character varying NOT NULL,
      "backdrop_path" character varying NOT NULL,
      "poster_path" character varying NOT NULL,
      "vote_average" integer, "vote_count" integer,
      "release_date" TIMESTAMP NOT NULL,
      "first_air_date" TIMESTAMP NOT NULL,
      CONSTRAINT "PK_d43c664bcaafc0e8a06dfd34e05" PRIMARY KEY ("id"));
      COMMENT ON COLUMN "programs"."origin_id" IS 'TMDB에서 제공하는 id';
      COMMENT ON COLUMN "programs"."origin_country" IS '제작 국가';
      COMMENT ON COLUMN "programs"."origin_name" IS '원작 제목';
      COMMENT ON COLUMN "programs"."vote_average" IS '평균 평점';
      COMMENT ON COLUMN "programs"."vote_count" IS '평점 매긴 횟수';
      COMMENT ON COLUMN "programs"."release_date" IS '개봉일';
      COMMENT ON COLUMN "programs"."first_air_date" IS '첫 방영일'`,
    );

    await queryRunner.query(
      `CREATE TABLE "genres_programs"
      (
        "program_id" uuid NOT NULL,
        "genre_id" uuid NOT NULL,
        CONSTRAINT "PK_5f2b0b76d84d75e3803c0ee3ca9" PRIMARY KEY ("program_id", "genre_id")
       )`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d4ef6cd7dcaced5e904caefce8" ON "genres_programs" ("program_id") `,
    );

    await queryRunner.query(
      `CREATE INDEX "IDX_d38597d6992a9c6a13522a1e0c" ON "genres_programs" ("genre_id") `,
    );

    await queryRunner.query(
      `CREATE TABLE "watch_providers_programs"
      (
        "program_id" uuid NOT NULL,
        "watch_provider_id" uuid NOT NULL,
        CONSTRAINT "PK_31e906396feb57269584229c14f" PRIMARY KEY ("program_id", "watch_provider_id")
      )`,
    );

    await queryRunner.query(
      `CREATE INDEX "IDX_3d6341618cc50586d8f4979c60" ON "watch_providers_programs" ("program_id") `,
    );

    await queryRunner.query(
      `CREATE INDEX "IDX_4c667868139f0e3d71f026b85b" ON "watch_providers_programs" ("watch_provider_id") `,
    );

    await queryRunner.query(`ALTER TABLE "reviews" ADD "program_id" uuid`);

    await queryRunner.query(
      `ALTER TABLE "reviews" ADD CONSTRAINT "FK_1eb7847a2d62b4a5cf1b4fec47c" 
      FOREIGN KEY ("program_id") REFERENCES "programs"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );

    await queryRunner.query(
      `ALTER TABLE "genres_programs" ADD CONSTRAINT "FK_d4ef6cd7dcaced5e904caefce8b"
       FOREIGN KEY ("program_id") REFERENCES "programs"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );

    await queryRunner.query(
      `ALTER TABLE "genres_programs" ADD CONSTRAINT "FK_d38597d6992a9c6a13522a1e0c1"
       FOREIGN KEY ("genre_id") REFERENCES "genres"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `ALTER TABLE "watch_providers_programs" ADD CONSTRAINT "FK_3d6341618cc50586d8f4979c60e"
       FOREIGN KEY ("program_id") REFERENCES "programs"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );

    await queryRunner.query(
      `ALTER TABLE "watch_providers_programs" ADD CONSTRAINT "FK_4c667868139f0e3d71f026b85b8" 
       FOREIGN KEY ("watch_provider_id") REFERENCES "watch_providers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "watch_providers_programs" DROP CONSTRAINT "FK_4c667868139f0e3d71f026b85b8"`,
    );

    await queryRunner.query(
      `ALTER TABLE "watch_providers_programs" DROP CONSTRAINT "FK_3d6341618cc50586d8f4979c60e"`,
    );

    await queryRunner.query(
      `ALTER TABLE "genres_programs" DROP CONSTRAINT "FK_d38597d6992a9c6a13522a1e0c1"`,
    );

    await queryRunner.query(
      `ALTER TABLE "genres_programs" DROP CONSTRAINT "FK_d4ef6cd7dcaced5e904caefce8b"`,
    );

    await queryRunner.query(
      `ALTER TABLE "reviews" DROP CONSTRAINT "FK_1eb7847a2d62b4a5cf1b4fec47c"`,
    );

    await queryRunner.query(`ALTER TABLE "reviews" DROP COLUMN "program_id"`);

    await queryRunner.query(
      `DROP INDEX "public"."IDX_4c667868139f0e3d71f026b85b"`,
    );

    await queryRunner.query(
      `DROP INDEX "public"."IDX_3d6341618cc50586d8f4979c60"`,
    );

    await queryRunner.query(`DROP TABLE "watch_providers_programs"`);

    await queryRunner.query(
      `DROP INDEX "public"."IDX_d38597d6992a9c6a13522a1e0c"`,
    );

    await queryRunner.query(
      `DROP INDEX "public"."IDX_d4ef6cd7dcaced5e904caefce8"`,
    );

    await queryRunner.query(`DROP TABLE "genres_programs"`);

    await queryRunner.query(`DROP TABLE "programs"`);

    await queryRunner.query(`DROP TABLE "watch_providers"`);

    await queryRunner.query(`DROP TABLE "genres"`);
  }
}

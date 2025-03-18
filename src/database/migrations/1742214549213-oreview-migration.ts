import type { MigrationInterface, QueryRunner } from 'typeorm';

export class OreviewMigration1742214549213 implements MigrationInterface {
  name = 'OreviewMigration1742214549213';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "reviews" 
      (
      "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
      "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), 
      "user_id" uuid NOT NULL, CONSTRAINT "PK_231ae565c273ee700b283f15c1d" PRIMARY KEY ("id")
      )`,
    );

    await queryRunner.query(
      `CREATE TYPE "public"."users_role_enum" AS ENUM('USER', 'ADMIN')`,
    );

    await queryRunner.query(
      `CREATE TABLE "users" 
      (
      "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
      "created_at" TIMESTAMP NOT NULL DEFAULT now(), 
      "updated_at" TIMESTAMP NOT NULL DEFAULT now(), 
      "email" character varying NOT NULL, 
      "password" character varying, 
      "nick_name" character varying NOT NULL, 
      "refresh_token" character varying, 
      "register_provider" character varying, 
      "register_provider_token" character varying, 
      "profile_image" character varying, 
      "role" "public"."users_role_enum" NOT NULL DEFAULT 'USER', 
      CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), 
      CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")); 
      COMMENT ON COLUMN "users"."register_provider_token" IS 'SNS token'; 
      COMMENT ON COLUMN "users"."profile_image" IS 'SNS token'`,
    );

    await queryRunner.query(
      `ALTER TABLE "reviews" 
        ADD CONSTRAINT "FK_728447781a30bc3fcfe5c2f1cdf" FOREIGN KEY ("user_id") 
        REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "reviews" DROP CONSTRAINT "FK_728447781a30bc3fcfe5c2f1cdf"`,
    );
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    await queryRunner.query(`DROP TABLE "reviews"`);
  }
}

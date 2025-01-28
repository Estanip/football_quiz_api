import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateRelationships1737227255352 implements MigrationInterface {
  name = 'UpdateRelationships1737227255352';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "level" ("id" SERIAL NOT NULL, "name" "public"."level_name_enum" NOT NULL, "is_active" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_8ca955843d28dd01385e8a95886" UNIQUE ("name"), CONSTRAINT "PK_d3f1a7a6f09f1c3144bacdc6bcc" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying(30) NOT NULL, "password" character varying NOT NULL, "role" "public"."users_role_enum" NOT NULL, "is_active" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "question" ("id" SERIAL NOT NULL, "text" character varying NOT NULL, "level" "public"."question_level_enum" NOT NULL, "correct_answer_id" integer, "category_id" integer, "subcategory_id" integer, CONSTRAINT "UQ_0c4095f2023b5c40ec3120b2ae3" UNIQUE ("text"), CONSTRAINT "PK_21e5786aa0ea704ae185a79b2d5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "category" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "answer" ("id" SERIAL NOT NULL, "text" character varying NOT NULL, CONSTRAINT "UQ_b43889113d5427282a46ecd14cc" UNIQUE ("text"), CONSTRAINT "PK_9232db17b63fb1e94f97e5c224f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "subcategory" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_5ad0b82340b411f9463c8e9554d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "question_answer_options" ("questionId" integer NOT NULL, "answerId" integer NOT NULL, CONSTRAINT "PK_10d2cecb95dd188c39b9f30f268" PRIMARY KEY ("questionId", "answerId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0c3b42b512b0cf5e6ec49d660c" ON "question_answer_options" ("questionId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_13172ee326d1b293399eaf765a" ON "question_answer_options" ("answerId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "answer_category" ("answerId" integer NOT NULL, "categoryId" integer NOT NULL, CONSTRAINT "PK_5b027fc0436d43038153165fba3" PRIMARY KEY ("answerId", "categoryId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4d3a8dc632341ecd35597603ae" ON "answer_category" ("answerId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9bc6a7ba92fe27a170cf34a626" ON "answer_category" ("categoryId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "answer_subcategory" ("answerId" integer NOT NULL, "subcategoryId" integer NOT NULL, CONSTRAINT "PK_f82af900020e7d649261d4bfd29" PRIMARY KEY ("answerId", "subcategoryId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4122731d95f224048c27e34f86" ON "answer_subcategory" ("answerId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_82f56968c897d758cb474e72fd" ON "answer_subcategory" ("subcategoryId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "question" ADD CONSTRAINT "FK_8ab40e72d17265760138945a1d9" FOREIGN KEY ("correct_answer_id") REFERENCES "answer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "question" ADD CONSTRAINT "FK_5fd605f755be75e9ea3ee3fdc18" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "question" ADD CONSTRAINT "FK_35c4c01580ac3ba3e965f733e3c" FOREIGN KEY ("subcategory_id") REFERENCES "subcategory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "question_answer_options" ADD CONSTRAINT "FK_0c3b42b512b0cf5e6ec49d660cf" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "question_answer_options" ADD CONSTRAINT "FK_13172ee326d1b293399eaf765a1" FOREIGN KEY ("answerId") REFERENCES "answer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "answer_category" ADD CONSTRAINT "FK_4d3a8dc632341ecd35597603aeb" FOREIGN KEY ("answerId") REFERENCES "answer"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "answer_category" ADD CONSTRAINT "FK_9bc6a7ba92fe27a170cf34a6267" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "answer_subcategory" ADD CONSTRAINT "FK_4122731d95f224048c27e34f86e" FOREIGN KEY ("answerId") REFERENCES "answer"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "answer_subcategory" ADD CONSTRAINT "FK_82f56968c897d758cb474e72fd1" FOREIGN KEY ("subcategoryId") REFERENCES "subcategory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "answer_subcategory" DROP CONSTRAINT "FK_82f56968c897d758cb474e72fd1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "answer_subcategory" DROP CONSTRAINT "FK_4122731d95f224048c27e34f86e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "answer_category" DROP CONSTRAINT "FK_9bc6a7ba92fe27a170cf34a6267"`,
    );
    await queryRunner.query(
      `ALTER TABLE "answer_category" DROP CONSTRAINT "FK_4d3a8dc632341ecd35597603aeb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "question_answer_options" DROP CONSTRAINT "FK_13172ee326d1b293399eaf765a1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "question_answer_options" DROP CONSTRAINT "FK_0c3b42b512b0cf5e6ec49d660cf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "question" DROP CONSTRAINT "FK_35c4c01580ac3ba3e965f733e3c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "question" DROP CONSTRAINT "FK_5fd605f755be75e9ea3ee3fdc18"`,
    );
    await queryRunner.query(
      `ALTER TABLE "question" DROP CONSTRAINT "FK_8ab40e72d17265760138945a1d9"`,
    );
    await queryRunner.query(`DROP INDEX "public"."IDX_82f56968c897d758cb474e72fd"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_4122731d95f224048c27e34f86"`);
    await queryRunner.query(`DROP TABLE "answer_subcategory"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_9bc6a7ba92fe27a170cf34a626"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_4d3a8dc632341ecd35597603ae"`);
    await queryRunner.query(`DROP TABLE "answer_category"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_13172ee326d1b293399eaf765a"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_0c3b42b512b0cf5e6ec49d660c"`);
    await queryRunner.query(`DROP TABLE "question_answer_options"`);
    await queryRunner.query(`DROP TABLE "subcategory"`);
    await queryRunner.query(`DROP TABLE "answer"`);
    await queryRunner.query(`DROP TABLE "category"`);
    await queryRunner.query(`DROP TABLE "question"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "level"`);
  }
}

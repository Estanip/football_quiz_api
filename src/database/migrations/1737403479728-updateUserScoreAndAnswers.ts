import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUserScoreAndAnswers1737403479728 implements MigrationInterface {
  name = 'UpdateUserScoreAndAnswers1737403479728';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "score_history" ("id" SERIAL NOT NULL, "change" integer NOT NULL, "reason" character varying(255), "changedAt" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer, CONSTRAINT "PK_4db9bfe50f50c7737fc04c2fb2a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_answers" ("id" SERIAL NOT NULL, "isCorrect" boolean NOT NULL, "answeredAt" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer, "question_id" integer, "answer_id" integer, CONSTRAINT "PK_08977c1a2a5f1b8b472dbd87d04" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "users" ADD "score" integer NOT NULL DEFAULT '0'`);
    await queryRunner.query(
      `ALTER TABLE "score_history" ADD CONSTRAINT "FK_27174c746b0a51614b5828ea6a2" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_answers" ADD CONSTRAINT "FK_d84d10f2e3b97a037d5479bf669" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_answers" ADD CONSTRAINT "FK_adae59e684b873b084be36c5a7a" FOREIGN KEY ("question_id") REFERENCES "question"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_answers" ADD CONSTRAINT "FK_0e5dee6483b796c98b894c738f7" FOREIGN KEY ("answer_id") REFERENCES "answer"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_answers" DROP CONSTRAINT "FK_0e5dee6483b796c98b894c738f7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_answers" DROP CONSTRAINT "FK_adae59e684b873b084be36c5a7a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_answers" DROP CONSTRAINT "FK_d84d10f2e3b97a037d5479bf669"`,
    );
    await queryRunner.query(
      `ALTER TABLE "score_history" DROP CONSTRAINT "FK_27174c746b0a51614b5828ea6a2"`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "score"`);
    await queryRunner.query(`DROP TABLE "user_answers"`);
    await queryRunner.query(`DROP TABLE "score_history"`);
  }
}

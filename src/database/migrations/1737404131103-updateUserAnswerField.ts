import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUserAnswerField1737404131103 implements MigrationInterface {
  name = 'UpdateUserAnswerField1737404131103';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_answers" RENAME COLUMN "answeredAt" TO "answered_at"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_answers" RENAME COLUMN "answered_at" TO "answeredAt"`,
    );
  }
}

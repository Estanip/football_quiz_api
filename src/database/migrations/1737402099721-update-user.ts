import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUser1737402099721 implements MigrationInterface {
  name = 'UpdateUser1737402099721';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD "score" integer NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "score"`);
  }
}

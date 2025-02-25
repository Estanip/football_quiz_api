import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserFavteamField1740326982844 implements MigrationInterface {
  name = 'UserFavteamField1740326982844';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD "favTeam" character varying`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "favTeam"`);
  }
}

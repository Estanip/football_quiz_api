import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';

import { dbTestConfig } from '../__test__/config/db.test-config';
import { Environment, loadEnvironment } from '../configuration/environment/env.config';
loadEnvironment();

@Injectable()
export class DatabaseService implements TypeOrmOptionsFactory {
  private _dataSource: DataSource;

  constructor() {}

  async clearDatabase(): Promise<void> {
    const queryRunner = this._dataSource.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      const tables = await this._dataSource.query(
        "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'",
      );

      for (const table of tables) {
        const tableName = table.table_name;
        if (tableName !== 'migrations')
          await queryRunner.manager.query(`TRUNCATE TABLE ${tableName} RESTART IDENTITY CASCADE`);
      }

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async closeConnection(): Promise<void> {
    await this._dataSource.destroy();
  }

  async initialize() {
    if (!this._dataSource.isInitialized) await this._dataSource.initialize();
  }

  createTypeOrmOptions(): DataSourceOptions {
    const env = process.env as Environment;
    return {
      type: env.DB_TYPE as any,
      host: env.DB_HOST,
      port: parseInt(env.DB_PORT, 10),
      username: env.DB_USERNAME,
      password: env.DB_PASSWORD,
      database: env.DB_NAME,
      synchronize: false,
      ssl: env.DB_SSL === 'true' && Boolean(env.DB_SSL),
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/migrations/*{.ts,.js}'],
      migrationsTableName: 'migrations_history',
      migrationsRun: false,
      //logging: ['error', 'warn'],
    };
  }

  getDataSource(): DataSource {
    return this._dataSource;
  }

  setDataSource() {
    const options = process.env.NODE_ENV === 'test' ? dbTestConfig() : this.createTypeOrmOptions();
    this._dataSource = new DataSource(options);
  }
}

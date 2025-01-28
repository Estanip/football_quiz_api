import { loadEnvironment } from 'src/configuration/environment/env.config';
import { DataSource } from 'typeorm';

import { DatabaseService } from './database.service';
loadEnvironment();

const databaseService = new DatabaseService();

export const AppDataSource = new DataSource(databaseService.createTypeOrmOptions());

import { loadEnvironment } from 'src/configuration/environment/env.config';
import { DatabaseService } from 'src/database/database.service';
loadEnvironment();

const databaseService = new DatabaseService();

export async function clearDatabase() {
  await databaseService.clearDatabase();
}

export async function closeDatabaseConnection() {
  await databaseService.closeConnection();
}

export async function initializeDatabaseConnection() {
  await databaseService.setDataSource();
  await databaseService.initialize();
}

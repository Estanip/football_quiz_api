import { loadEnvironment } from 'src/configuration/environment/env.config';
import { DatabaseService } from 'src/database/database.service';
import { Seeder } from 'src/database/seeds/seeder';
import { TestSeeder } from 'src/database/seeds/test-seeder';
loadEnvironment();

export async function runSeed() {
  const databaseService = new DatabaseService();

  await databaseService.setDataSource();
  await databaseService.initialize();

  const dataSource = databaseService.getDataSource();
  const seeder =
    process.env.NODE_ENV === 'test'
      ? new TestSeeder(dataSource, databaseService)
      : new Seeder(dataSource, databaseService);

  try {
    await seeder.run();
    console.log('Seeded completed successfully');
  } catch (error) {
    console.error('Seeding failed:');
  } finally {
    await databaseService.closeConnection();
  }
}

runSeed();

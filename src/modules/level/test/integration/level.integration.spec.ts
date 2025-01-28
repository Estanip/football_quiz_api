import { CacheModule } from '@nestjs/cache-manager';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { redisTestConfig } from 'src/__test__/config/cache.test-config';
import { dbTestConfig } from 'src/__test__/config/db.test-config';
import { clearCache } from 'src/__test__/utils/cache.test-util';
import {
  clearDatabase,
  closeDatabaseConnection,
  initializeDatabaseConnection,
} from 'src/__test__/utils/db.test-util';
import { RedisService } from 'src/common/cache/redis.service';
import { loadEnvironment } from 'src/configuration/environment/env.config';
import { Level } from 'src/constants/level';
import { runSeed } from 'src/database/seeds';
import { LevelEntity } from 'src/modules/level/entities/level.entity';
import { LevelController } from 'src/modules/level/level.controller';
import { LevelService } from 'src/modules/level/level.service';
import { BaseRepository } from 'src/modules/shared/repository/base-repository';
import { ResponseService } from 'src/modules/shared/services/success-response.service';
import { Repository } from 'typeorm';
loadEnvironment();

describe('Level (Integration)', () => {
  let levelController: LevelController;
  let redisService: RedisService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRootAsync({
          useFactory: async () => dbTestConfig(),
        }),
        TypeOrmModule.forFeature([LevelEntity]),
        CacheModule.registerAsync({
          useFactory: async () => redisTestConfig(),
        }),
      ],
      controllers: [LevelController],
      providers: [
        LevelService,
        RedisService,
        ResponseService,
        {
          provide: BaseRepository,
          useFactory: (repo: Repository<LevelEntity>) => new BaseRepository<LevelEntity>(repo),
          inject: [getRepositoryToken(LevelEntity)],
        },
      ],
    }).compile();

    await initializeDatabaseConnection();
    await runSeed();

    levelController = module.get<LevelController>(LevelController);
    redisService = module.get<RedisService>(RedisService);
  });

  describe('create', () => {
    it('should create a level and return a success response', async () => {
      const createLevelDto = { name: Level.MEDIUM };
      const result = await levelController.create(createLevelDto);
      expect(result).toBeDefined();
      expect(result.statusCode).toEqual(201);
      expect(result.data).toHaveProperty('name', Level.MEDIUM);
    });
  });

  describe('getLevels', () => {
    it('should retrieve an array of levels', async () => {
      const result = await levelController.get();
      expect(result.data).toBeInstanceOf(Array);
      expect(result.data.length).toBeGreaterThan(0);
      expect(result.data[0]).toHaveProperty('name');
    });
  });

  afterAll(async () => {
    await clearDatabase();
    await closeDatabaseConnection();
    await clearCache(redisService);
  });
});

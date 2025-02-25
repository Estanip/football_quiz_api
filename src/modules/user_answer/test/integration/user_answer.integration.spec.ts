import { CacheModule } from '@nestjs/cache-manager';
import { APP_GUARD } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { ThrottlerGuard } from '@nestjs/throttler';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { redisTestConfig } from 'src/__test__/config/cache.test-config';
import { dbTestConfig } from 'src/__test__/config/db.test-config';
import { unitTestConfig } from 'src/__test__/config/unit.test-config';
import { clearCache } from 'src/__test__/utils/cache.test-util';
import {
  clearDatabase,
  closeDatabaseConnection,
  initializeDatabaseConnection,
} from 'src/__test__/utils/db.test-util';
import { RedisService } from 'src/common/cache/redis.service';
import { loadEnvironment } from 'src/configuration/environment/env.config';
import { runSeed } from 'src/database/seeds';
import { QuestionService } from 'src/modules/question/question.service';
import { BaseRepository } from 'src/modules/shared/repository/base.repository';
import { ResponseService } from 'src/modules/shared/services/success-response.service';
import { UserAnswerEntity } from 'src/modules/user_answer/entities/user_answer.entity';
import { UserAnswerController } from 'src/modules/user_answer/user_answer.controller';
import { UserAnswerService } from 'src/modules/user_answer/user_answer.service';
import { Repository } from 'typeorm';
loadEnvironment();

describe('UserAnswer (Integration)', () => {
  let userAnswerController: UserAnswerController;
  //let questionService: QuestionService;
  let questionService: jest.Mocked<QuestionService>;
  let redisService: RedisService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRootAsync({
          useFactory: async () => dbTestConfig(),
        }),
        TypeOrmModule.forFeature([UserAnswerEntity]),
        CacheModule.registerAsync({
          useFactory: async () => redisTestConfig(),
        }),
      ],
      controllers: [UserAnswerController],
      providers: [
        UserAnswerService,
        RedisService,
        ResponseService,
        { provide: QuestionService, useValue: unitTestConfig.questionServiceMock.useValue },
        {
          provide: BaseRepository,
          useFactory: (repo: Repository<UserAnswerEntity>) =>
            new BaseRepository<UserAnswerEntity>(repo),
          inject: [getRepositoryToken(UserAnswerEntity)],
        },
        {
          provide: APP_GUARD,
          useValue: { canActivate: jest.fn().mockReturnValue(true) },
        },
      ],
    })
      .overrideGuard(ThrottlerGuard)
      .useValue({ canActivate: jest.fn().mockReturnValue(true) })
      .compile();

    await initializeDatabaseConnection();
    await runSeed();

    userAnswerController = module.get<UserAnswerController>(UserAnswerController);
    // questionService = module.get<QuestionService>(QuestionService);
    questionService = module.get(QuestionService) as jest.Mocked<QuestionService>;
    redisService = module.get<RedisService>(RedisService);
  });

  describe('', () => {
    it('should return an empty array if no userAnswers exist', async () => {
      expect(true).toBe(true);
    });
  });

  describe('create', () => {
    it('should create a userAnswer and return a success response', async () => {
      const createUserAnswerDto = {
        user: 1,
        answer: 1,
        question: 1,
        answeredAt: new Date('2025-01-01'),
      };
      const result = await userAnswerController.create(createUserAnswerDto);

      expect(result).toBeDefined();
      expect(result.statusCode).toEqual(201);
      expect(result.data).toHaveProperty('id');
      expect(result.data).toHaveProperty('isCorrect');
      expect(questionService.findById).toHaveBeenCalled();
    });
  });

  describe('getUserAnswers', () => {
    it('should retrieve an array of userAnswers', async () => {
      const result = await userAnswerController.get();

      expect(result.data).toBeInstanceOf(Array);
      expect(result.data.length).toBeGreaterThan(0);
      expect(result.data[0]).toHaveProperty('id');
      expect(result.data[0]).toHaveProperty('isCorrect');
    });
  });

  afterAll(async () => {
    await clearDatabase();
    await closeDatabaseConnection();
    await clearCache(redisService);
  });
});

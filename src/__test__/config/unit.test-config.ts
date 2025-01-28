import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RedisService } from 'src/common/cache/redis.service';
import { Level } from 'src/constants/level';
import { Role } from 'src/constants/role';
import { LevelEntity } from 'src/modules/level/entities/level.entity';
import { LevelService } from 'src/modules/level/level.service';
import { QuestionService } from 'src/modules/question/question.service';
import { ResponseService } from 'src/modules/shared/services/success-response.service';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { UserService } from 'src/modules/user/user.service';
import { UserAnswerEntity } from 'src/modules/user_answer/entities/user_answer.entity';
import { UserAnswerService } from 'src/modules/user_answer/user_answer.service';

const levelEntity = { id: 1, name: Level.EASY, isActive: true };
const levelResult = { name: Level.EASY };

const userEntity = {
  id: 1,
  email: 'test@test.com',
  password: 'test',
  role: Role.Admin,
  isActive: true,
};
const userResult = { id: 1, email: 'test@test.com', role: Role.Admin };

const userAnswerEntity = {
  id: 1,
  user: 1,
  question: 1,
  answer: 1,
  answeredAt: new Date('2025-01-01'),
  isActive: true,
};
const userAnswerResult = {
  id: 1,
  user: 1,
  question: 1,
  answer: 1,
  answeredAt: new Date('2025-01-01'),
};

const questionEntity = {
  id: 1,
  text: 'Pregunta de prueba',
  answerOptions: [1, 5, 6],
  correctAnswer: 1,
  category: 1,
  subcategory: 1,
  level: Level.EASY,
  isActive: true,
};
const questionResult = {
  id: 1,
  text: 'Pregunta de prueba',
  answerOptions: [1, 5, 6],
  correctAnswer: 1,
  category: 1,
  subcategory: 1,
  level: Level.EASY,
};

export const unitTestConfig = {
  cacheManagerMock: {
    provide: CACHE_MANAGER,
    useValue: {
      get: jest.fn(),
      set: jest.fn(),
    },
  },

  redisServiceMock: {
    provide: RedisService,
    useValue: {
      get: jest.fn().mockResolvedValue(null),
      set: jest.fn().mockResolvedValue(true),
    },
  },

  responseServiceMock: {
    provide: ResponseService,
    useValue: {
      success: jest.fn(),
    },
  },

  // Services
  levelServiceMock: {
    provide: LevelService,
    useValue: {
      ..._setBaseServiceValue(levelEntity, levelResult),
      findAll: jest.fn().mockResolvedValue([levelResult]),
    },
  },

  questionServiceMock: {
    provide: QuestionService,
    useValue: {
      ..._setBaseServiceValue(questionEntity, questionResult),
      findAll: jest.fn().mockResolvedValue([questionResult]),
      findById: jest.fn().mockResolvedValue(questionResult),
    },
  },

  userAnswerServiceMock: {
    provide: UserAnswerService,
    useValue: {
      ..._setBaseServiceValue(userAnswerEntity, userAnswerResult),
      createAnswer: jest.fn().mockResolvedValue(userAnswerEntity),
      findAll: jest.fn().mockResolvedValue([userAnswerResult]),
      findOneByEmail: jest.fn().mockResolvedValue(userAnswerResult),
    },
  },

  userServiceMock: {
    provide: UserService,
    useValue: {
      ..._setBaseServiceValue(userEntity, userResult),
      findAll: jest.fn().mockResolvedValue([userResult]),
      findOneByEmail: jest.fn().mockResolvedValue(userResult),
    },
  },

  // Repositories
  levelRepositoryMock: {
    provide: getRepositoryToken(LevelEntity),
    useValue: _setBaseRepositoryValue(levelEntity, levelResult),
  },

  userAnswerRepositoryMock: {
    provide: getRepositoryToken(UserAnswerEntity),
    useValue: _setBaseRepositoryValue(userAnswerEntity, userAnswerResult),
  },

  userRepositoryMock: {
    provide: getRepositoryToken(UserEntity),
    useValue: _setBaseRepositoryValue(userEntity, userResult),
  },
};

function _setBaseServiceValue(entity, result) {
  return {
    create: jest.fn().mockResolvedValue(entity),
    find: jest.fn().mockResolvedValue([result]),
  };
}

function _setBaseRepositoryValue(entity, result) {
  return {
    create: jest.fn().mockResolvedValue(entity),
    find: jest.fn().mockResolvedValue([result]),
    findOne: jest.fn().mockResolvedValue(result),
    update: jest.fn().mockResolvedValue(result),
    delete: jest.fn().mockResolvedValue(undefined),
  };
}

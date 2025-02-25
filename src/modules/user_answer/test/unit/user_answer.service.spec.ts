import { Test, TestingModule } from '@nestjs/testing';
import { unitTestConfig } from 'src/__test__/config/unit.test-config';
import { Level } from 'src/constants/level';
import { QuestionService } from 'src/modules/question/question.service';
import { BaseRepository } from 'src/modules/shared/repository/base.repository';
import { UserAnswerEntity } from 'src/modules/user_answer/entities/user_answer.entity';
import { UserAnswerService } from 'src/modules/user_answer/user_answer.service';

describe('UserAnswerService', () => {
  let userAnswerService: UserAnswerService;
  let userAnswerRepository: jest.Mocked<BaseRepository<UserAnswerEntity>>;
  let questionService: jest.Mocked<QuestionService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserAnswerService,
        {
          provide: BaseRepository,
          useValue: unitTestConfig.userAnswerRepositoryMock.useValue,
        },
        {
          provide: QuestionService,
          useValue: unitTestConfig.questionServiceMock.useValue,
        },
      ],
    }).compile();

    userAnswerService = module.get<UserAnswerService>(UserAnswerService);
    questionService = module.get(QuestionService) as jest.Mocked<QuestionService>;
    userAnswerRepository = module.get(BaseRepository) as jest.Mocked<
      BaseRepository<UserAnswerEntity>
    >;
  });

  it('should be defined', () => {
    expect(userAnswerService).toBeDefined();
  });

  describe('create', () => {
    it('should create a new userAnswer', async () => {
      const createUserAnswerDto = {
        user: 1,
        answer: 1,
        question: 1,
        answeredAt: new Date('2025-01-01'),
      };
      const userAnswerEntity = {
        user: 1,
        answer: 1,
        question: 1,
        id: 1,
        isActive: true,
      };
      const questionEntity = {
        id: 1,
        text: 'Pregunta de prueba',
        answerOptions: [1],
        correctAnswer: { id: 1 },
        category: 1,
        subcategory: 1,
        level: Level.EASY,
        isActive: true,
        userAnswers: [],
      };

      questionService.findById.mockResolvedValue(questionEntity as any);
      let result = await userAnswerService.createAnswer(createUserAnswerDto as any);
      result = { ...result, isCorrect: true };

      expect(result).toEqual({
        ...userAnswerEntity,
        answeredAt: new Date('2025-01-01'),
      });
      expect(userAnswerRepository.createEntity).toHaveBeenCalledWith({
        user: { id: 1 },
        answer: { id: 1 },
        question: { id: 1 },
      });
      expect(userAnswerRepository.createEntity).toHaveBeenCalledTimes(1);
      expect(questionService.findById).toHaveBeenCalledWith(createUserAnswerDto.question);
    });

    it('should throw an error if creation fails', async () => {
      const createUserAnswerDto = {
        answer: 1,
        question: 1,
      };
      const error = new Error('Required fields empty');
      userAnswerRepository.createEntity.mockRejectedValue(error);

      await expect(userAnswerService.createAnswer(createUserAnswerDto as any)).rejects.toThrow(
        error,
      );
    });
  });

  describe('get', () => {
    it('should return a list of userAnswers', async () => {
      const userAnswers = await userAnswerService.findAll();

      expect(userAnswers).toEqual([
        {
          id: 1,
          user: 1,
          answer: 1,
          question: 1,
          answeredAt: new Date('2025-01-01'),
        },
      ]);
      expect(userAnswerRepository.findEntities).toHaveBeenCalled();
    });

    it('should return an empty list if no userAnswers are found', async () => {
      userAnswerRepository.findEntities.mockResolvedValue([]);

      const userAnswers = await userAnswerService.findAll();

      expect(userAnswers).toEqual([]);
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { unitTestConfig } from 'src/__test__/config/unit.test-config';
import { ResponseService } from 'src/modules/shared/services/success-response.service';
import { UserAnswerController } from 'src/modules/user_answer/user_answer.controller';
import { UserAnswerService } from 'src/modules/user_answer/user_answer.service';

describe('UserAnswerController', () => {
  let userAnswerController: UserAnswerController;
  let userAnswerService: jest.Mocked<UserAnswerService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserAnswerController],
      providers: [
        unitTestConfig.cacheManagerMock,
        {
          provide: UserAnswerService,
          useValue: unitTestConfig.userAnswerServiceMock.useValue,
        },
        ResponseService,
      ],
    }).compile();

    userAnswerController = module.get<UserAnswerController>(UserAnswerController);
    userAnswerService = module.get<jest.Mocked<UserAnswerService>>(UserAnswerService);
  });

  it('should be defined', () => {
    expect(userAnswerController).toBeDefined();
  });

  describe('get', () => {
    it('should return a list of userAnswers', async () => {
      const userAnswers = [
        {
          id: 1,
          user: 1,
          answer: 1,
          question: 1,
          answeredAt: new Date('2025-01-01'),
          isCorrect: true,
        },
      ];
      userAnswerService.findAll.mockResolvedValue(userAnswers);
      const result = await userAnswerController.get();

      expect(userAnswerService.findAll).toHaveBeenCalled();
      expect(result.data).toEqual(userAnswers);
    });

    it('should return an empty list if no userAnswers are found', async () => {
      userAnswerService.findAll.mockResolvedValue([]);
      const result = await userAnswerController.get();

      expect(userAnswerService.findAll).toHaveBeenCalled();
      expect(result.data).toEqual([]);
    });
  });

  describe('create', () => {
    it('should create a new userAnswer', async () => {
      const createUserAnswerDto = {
        user: 1,
        answer: 1,
        question: 1,
        answeredAt: new Date('2025-01-01'),
      };

      const result = await userAnswerController.create(createUserAnswerDto);

      expect(result.success).toEqual(true);
      expect(result.data).toEqual({
        id: 1,
        user: 1,
        answer: 1,
        question: 1,
        answeredAt: new Date('2025-01-01'),
        isCorrect: result.data.isCorrect,
        isActive: true,
      });
      expect(userAnswerService.createAnswer).toHaveBeenCalledWith({
        ...createUserAnswerDto,
        isCorrect: result.data.isCorrect,
      });
      expect(userAnswerService.createAnswer).toHaveBeenCalledTimes(1);
    });

    it('should return an error if creation fails', async () => {
      const createUserAnswerDto = { id: 1, user: 1, answer: 1 } as any;
      await expect(userAnswerController.create(createUserAnswerDto)).rejects.toThrow('Bad Request');
    });
  });
});

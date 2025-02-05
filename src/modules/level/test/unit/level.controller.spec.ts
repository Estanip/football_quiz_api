import { APP_GUARD } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { ThrottlerGuard } from '@nestjs/throttler';
import { unitTestConfig } from 'src/__test__/config/unit.test-config';
import { Level } from 'src/constants/level';
import { LevelController } from 'src/modules/level/level.controller';
import { LevelService } from 'src/modules/level/level.service';
import { ResponseService } from 'src/modules/shared/services/success-response.service';

describe('LevelController', () => {
  let levelController: LevelController;
  let levelService: jest.Mocked<LevelService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LevelController],
      providers: [
        unitTestConfig.cacheManagerMock,
        {
          provide: LevelService,
          useValue: unitTestConfig.levelServiceMock.useValue,
        },
        {
          provide: APP_GUARD,
          useValue: { canActivate: jest.fn().mockReturnValue(true) },
        },
        ResponseService,
      ],
    })
      .overrideGuard(ThrottlerGuard)
      .useValue({ canActivate: jest.fn().mockReturnValue(true) })
      .compile();

    levelController = module.get<LevelController>(LevelController);
    levelService = module.get<jest.Mocked<LevelService>>(LevelService);
  });

  it('should be defined', () => {
    expect(levelController).toBeDefined();
  });

  describe('get', () => {
    it('should return a list of levels', async () => {
      const levels = [{ name: Level.EASY }];
      levelService.findAll.mockResolvedValue(levels);
      const result = await levelController.get();

      expect(levelService.findAll).toHaveBeenCalled();
      expect(result.data).toEqual(levels);
    });

    it('should return an empty list if no levels are found', async () => {
      levelService.findAll.mockResolvedValue([]);
      const result = await levelController.get();

      expect(levelService.findAll).toHaveBeenCalled();
      expect(result.data).toEqual([]);
    });
  });

  describe('create', () => {
    it('should create a new level', async () => {
      const createLevelDto = { name: Level.EASY };

      const result = await levelController.create(createLevelDto);

      expect(result.success).toEqual(true);
      expect(result.data).toEqual({ name: Level.EASY, id: expect.any(Number), isActive: true });
      expect(levelService.create).toHaveBeenCalledWith(createLevelDto);
      expect(levelService.create).toHaveBeenCalledTimes(1);
    });

    it('should return an error if creation fails', async () => {
      const createLevelDto = { name: 'Mock' } as any;
      await expect(levelController.create(createLevelDto)).rejects.toThrow('Bad Request');
    });
  });
});

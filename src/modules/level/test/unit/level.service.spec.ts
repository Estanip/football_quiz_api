import { Test, TestingModule } from '@nestjs/testing';
import { unitTestConfig } from 'src/__test__/config/unit.test-config';
import { Level } from 'src/constants/level';
import { LevelEntity } from 'src/modules/level/entities/level.entity';
import { LevelService } from 'src/modules/level/level.service';
import { BaseRepository } from 'src/modules/shared/repository/base.repository';

describe('LevelService', () => {
  let levelService: LevelService;
  let levelRepository: jest.Mocked<BaseRepository<LevelEntity>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LevelService,
        {
          provide: BaseRepository,
          useValue: unitTestConfig.levelRepositoryMock.useValue,
        },
      ],
    }).compile();

    levelService = module.get<LevelService>(LevelService);
    levelRepository = module.get(BaseRepository) as jest.Mocked<BaseRepository<LevelEntity>>;
  });

  it('should be defined', () => {
    expect(levelService).toBeDefined();
  });

  describe('create', () => {
    it('should create a new level', async () => {
      const createLevelDto = { name: Level.EASY };
      const levelEntity = { id: 1, name: Level.EASY, isActive: true };

      const result = await levelService.create(createLevelDto);

      expect(result).toEqual(levelEntity);
      expect(levelRepository.createEntity).toHaveBeenCalledWith(createLevelDto);
      expect(levelRepository.createEntity).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if creation fails', async () => {
      const createLevelDto = { name: 'MOCK' } as any;
      const error = new Error('Invalid level name');
      levelRepository.createEntity.mockRejectedValue(error);

      await expect(levelService.create(createLevelDto)).rejects.toThrow(error);
    });
  });

  describe('get', () => {
    it('should return a list of levels', async () => {
      const levels = await levelService.findAll();

      expect(levels).toEqual([{ name: Level.EASY }]);
      expect(levelRepository.findEntities).toHaveBeenCalled();
    });

    it('should return an empty list if no levels are found', async () => {
      levelRepository.findEntities.mockResolvedValue([]);

      const levels = await levelService.findAll();

      expect(levels).toEqual([]);
    });
  });
});

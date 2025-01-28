import { Test, TestingModule } from '@nestjs/testing';
import { unitTestConfig } from 'src/__test__/config/unit.test-config';
import { Role } from 'src/constants/role';
import { BaseRepository } from 'src/modules/shared/repository/base-repository';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { UserService } from 'src/modules/user/user.service';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: jest.Mocked<BaseRepository<UserEntity>>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: BaseRepository,
          useValue: unitTestConfig.userRepositoryMock.useValue,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get(BaseRepository) as jest.Mocked<BaseRepository<UserEntity>>;
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('create', () => {
    it('should create a new admin user', async () => {
      const createUserDto = { email: 'test@test.com', password: 'test', role: Role.Admin };
      const userEntity = {
        id: 1,
        email: 'test@test.com',
        password: 'test',
        isActive: true,
        role: Role.Admin,
      };

      const result = await userService.create(createUserDto);

      expect(result).toEqual(userEntity);
      expect(userRepository.create).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('get', () => {
    it('should return a list of users', async () => {
      const users = await userService.findAll();

      expect(users).toEqual([{ id: 1, email: 'test@test.com', role: Role.Admin }]);
      expect(userRepository.find).toHaveBeenCalled();
    });
  });
});

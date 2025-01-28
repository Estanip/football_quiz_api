import { Test, TestingModule } from '@nestjs/testing';
import { unitTestConfig } from 'src/__test__/config/unit.test-config';
import { Role } from 'src/constants/role';
import { ResponseService } from 'src/modules/shared/services/success-response.service';
import { UserController } from 'src/modules/user/user.controller';
import { UserService } from 'src/modules/user/user.service';

describe('UserController', () => {
  let userController: UserController;
  let userService: jest.Mocked<UserService>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: unitTestConfig.userServiceMock.useValue,
        },
        ResponseService,
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<jest.Mocked<UserService>>(UserService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('get', () => {
    it('should return a list of users', async () => {
      const users = [{ id: 1, email: 'test@test.com', role: Role.Admin, score: 0 }];
      userService.findAll.mockResolvedValue(users);
      const result = await userController.get();

      expect(userService.findAll).toHaveBeenCalled();
      expect(result.data).toEqual(users);
    });

    it('should return an empty list if no users are found', async () => {
      userService.findAll.mockResolvedValue([]);
      const result = await userController.get();

      expect(userService.findAll).toHaveBeenCalled();
      expect(result.data).toEqual([]);
    });
  });

  describe('create', () => {
    it('should create a new admin user', async () => {
      const createUserDto = {
        email: 'test@test.com',
        password: 'Correctpassword1234*',
        role: Role.Admin,
      };

      const result = await userController.create(createUserDto);

      expect(result.success).toEqual(true);
      expect(result.data).toHaveProperty('id');
      expect(result.data).toHaveProperty('email');
      expect(result.data).toHaveProperty('password');
      expect(result.data).toHaveProperty('role');
      expect(result.data).toHaveProperty('isActive');
      expect(userService.create).toHaveBeenCalledWith(createUserDto);
      expect(userService.create).toHaveBeenCalledTimes(1);
    });

    it('should return an error if creation fails', async () => {
      const createUserDto = {
        email: 'invalidemail.com',
        password: 'notvalidapassword',
        role: Role.Admin,
      };
      await expect(userController.create(createUserDto)).rejects.toThrow('Bad Request');
    });
  });
});

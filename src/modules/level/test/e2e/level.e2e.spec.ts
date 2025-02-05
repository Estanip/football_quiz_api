import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ThrottlerGuard } from '@nestjs/throttler';
import * as cookieParser from 'cookie-parser';
import {
  clearDatabase,
  closeDatabaseConnection,
  initializeDatabaseConnection,
} from 'src/__test__/utils/db.test-util';
import { AppModule } from 'src/app.module';
import { Level } from 'src/constants/level';
import { Role } from 'src/constants/role';
import { runSeed } from 'src/database/seeds';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import * as request from 'supertest';

describe('Level (E2E)', () => {
  let app: INestApplication;
  let token: string;
  let adminCookies;
  let userCookies;
  const adminUser: CreateUserDto = {
    email: 'test@admin.com',
    password: 'Test1234',
    role: Role.Admin,
  };

  const userUser: CreateUserDto = {
    email: 'test@user.com',
    password: 'Test1234',
    role: Role.User,
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideGuard(ThrottlerGuard)
      .useValue({ canActivate: jest.fn().mockReturnValue(true) }) // Mockeamos el guard
      .compile();

    app = module.createNestApplication();
    app.use(cookieParser());

    await app.init();

    await initializeDatabaseConnection();
    await runSeed();
  });

  describe('POST /auth', () => {
    it('it should register an admin user successfully, login & set cookie succesfully', async () => {
      await _makeAuthenticatedRequest(app, 'post', '/auth/register', null, adminUser).expect(201);

      const response = await _makeAuthenticatedRequest(app, 'post', '/auth/login', null, {
        email: adminUser.email,
        password: adminUser.password,
      }).expect(200);

      token = response.body.data.access_token;
      adminCookies = response.headers['set-cookie'];

      expect(response.headers['set-cookie']).toBeDefined();
      expect(adminCookies[0]).toContain('access_token');
      expect(token).toBeDefined();
    });

    it('should login standard user & set cookie succesfully', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: userUser.email, password: userUser.password })
        .expect(200);

      userCookies = response.headers['set-cookie'];
      expect(userCookies[0]).toContain('access_token');
    });
  });

  describe('GET /level', () => {
    it('should return all levels with proper authorization', async () => {
      const response = await _makeAuthenticatedRequest(app, 'get', '/level', adminCookies).expect(
        200,
      );

      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0]).toMatchObject({ name: Level.EASY });
      expect(response.body.data).toBeInstanceOf(Array);
    });

    it('should return an error when user is not authenticated', async () => {
      await request(app.getHttpServer()).get('/level').expect(401);
    });
  });

  describe('POST /level', () => {
    const hardLevel = { name: Level.HARD };
    const mediumLevel = { name: Level.MEDIUM };

    it('should create a new level with proper authorization', async () => {
      const response = await _makeAuthenticatedRequest(
        app,
        'post',
        '/level',
        adminCookies,
        hardLevel,
      ).expect(201);

      expect(response.body.data).toHaveProperty('name');
      expect(response.body.data).toHaveProperty('id');
      expect(response.body.message).toEqual('Entity created successfully');
      expect(response.body.success).toBe(true);
    });

    it('should return an error when an user with user role try to create', async () => {
      const response = await _makeAuthenticatedRequest(
        app,
        'post',
        '/level',
        userCookies,
        mediumLevel,
      ).expect(401);

      expect(response.body.error).toEqual('Unauthorized');
      expect(response.body.message).toEqual('Access not allowed');
    });

    it('should return an error if level just exists', async () => {
      await _makeAuthenticatedRequest(app, 'post', '/level', adminCookies, hardLevel).expect(500);
    });
  });

  afterAll(async () => {
    await app.close();
    await clearDatabase();
    await closeDatabaseConnection();
  });
});

function _makeAuthenticatedRequest(
  app: INestApplication,
  method: 'get' | 'post',
  endpoint: string,
  cookie?: string[],
  body?: any,
) {
  const req = request(app.getHttpServer())
    [method](endpoint)
    .set('Cookie', cookie)
    .set(
      'x-csrf-token',
      'c00d2c77a0768297cb811e4b530f23d10fa9743a430da4089eae5f6464c6489c8832887dd45f971a0f6b38c0b65857b7da090c2fc00c006af69c537a012525f2',
    );
  if (body) req.send(body);
  return req;
}

// E2E GLOBAL
/* 
      //await request(app.getHttpServer()).post('/auth/register').send(userUser).expect(201);

    it('it login an user role user successfully and check cookies', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: userUser.email, password: userUser.password })
        .expect(200);

      token = response.body.data.access_token;
      userCookies = response.headers['set-cookie'];

      expect(response.headers['set-cookie']).toBeDefined();
      expect(adminCookies[0]).toContain('access_token');
      expect(token).toBeDefined();
    });
 */
/*     it('should return user not found', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'not-registered', password: 'test' })
        .expect(401);

      expect(response.body.message).toBe('User not found');
      expect(response.body.error).toBe('Unauthorized');
    }); */
/* 
    it('should register and login standard user successfully', async () => {
      await request(app.getHttpServer()).post('/auth/register').send(userUser).expect(201);

      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: userUser.email, password: userUser.password })
        .expect(200);

      userCookies = response.headers['set-cookie'];
      expect(userCookies[0]).toContain('access_token');
    });

    it('should fail to login with invalid credentials', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'invalid@test.com', password: 'wrong' })
        .expect(401);

      expect(response.body.message).toBe('User not found');
      expect(response.body.error).toBe('Unauthorized');
    });
 */

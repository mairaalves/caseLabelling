import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';

describe('AuthController', () => {
  let authController: AuthController;

  const loggedinUser = {
    status: 200,
    result: {
      message: 'Success',
      token: 'token',
      user: { name: 'User Name', id: '123', email: 'email@email.com' },
    },
  };

  beforeEach(async () => {
    const serviceProvider = {
      provide: AuthService,
      useFactory: () => ({
        login: jest.fn(() => loggedinUser),
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [serviceProvider],
    }).compile();

    authController = module.get<AuthController>(AuthController);
  });

  describe('POST login', () => {
    const loginData = { email: 'email@email.com', password: 'password' };
    const response = {
      json: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
    };

    it('should return logged in user', async () => {
      await authController.login(loginData, response);
      expect(response.status).toHaveBeenCalledWith(200);
      expect(response.json).toHaveBeenCalledWith(loggedinUser.result);
    });
  });
});

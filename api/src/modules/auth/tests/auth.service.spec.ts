import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { Auth } from '../schemas/auth.schemas';
import { getModelToken } from '@nestjs/mongoose';
const jwt = require('jsonwebtoken');

const defaultUser = {
  _id: "123",
  name: "user name",
  email: "user@email.com",
  password: "XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg="
}

const authMockModel = {
  findOne: jest.fn(),
}

jest.mock('crypto-js', () => {
  return {
    SHA256: jest.fn().mockReturnThis(),
    toString: jest.fn(() => defaultUser.password),
    enc: jest.fn().mockReturnThis(),
    Base64: jest.fn().mockReturnThis()
  };
});

jest.mock('jsonwebtoken');

describe('AuthService', () => {
  let service: AuthService;
  let authModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, {
        provide: getModelToken(Auth.name),
        useValue: authMockModel,
      }],
    }).compile();

    service = module.get<AuthService>(AuthService);
    authModel = module.get(getModelToken(Auth.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('POST login', () => {
    const authData = { email: "email@email.com", password: "password" };
    jwt.sign.mockImplementation(() => 'token');

    it('should search for the user email and password on db', async () => {
      authModel.findOne.mockImplementationOnce(() => ({
        exec: jest.fn().mockReturnValue(defaultUser),
      }));

      await service.login(authData);
      expect(authModel.findOne).toHaveBeenCalledWith({ email: authData.email });
    });

    it('should login successfully', async () => {
      const expectedSuccess = {
        status: 200,
        result: {
          message: 'Success',
          token: 'token',
          user: { name: defaultUser.name, id: defaultUser._id, email: defaultUser.email }
        }
      };

      authModel.findOne.mockImplementationOnce(() => ({
        exec: jest.fn().mockReturnValue(defaultUser),
      }));

      const { result, status } = await service.login(authData);

      expect(result).toEqual(expectedSuccess.result);
      expect(status).toEqual(expectedSuccess.status);
    });

    it('should return invalid password', async () => {
      const expectedInvalid = {
        status: 401,
        result: { message: 'Invalid password' }
      };

      const userWithInvalidPassword = {
        email: "email@email.com",
        password: "somethingelse"
      }
      authModel.findOne.mockImplementationOnce(() => ({
        exec: jest.fn().mockReturnValue(userWithInvalidPassword),
      }));

      const { result, status } = await service.login(authData);

      expect(result).toEqual(expectedInvalid.result);
      expect(status).toEqual(expectedInvalid.status);
    });

    it('should return User not found', async () => {
      const expectedNotFound = {
        status: 401,
        result: { message: 'User not found' }
      };

      authModel.findOne.mockImplementationOnce(() => ({
        exec: jest.fn().mockReturnValue(null),
      }));

      const { result, status } = await service.login(authData);

      expect(result).toEqual(expectedNotFound.result);
      expect(status).toEqual(expectedNotFound.status);
    });
  });
});


import bcrypt from 'bcrypt';
import { jest , describe, beforeEach , it , expect ,  } from '@jest/globals'
import { UserModel } from '../user-model';
import { UserService } from '../user-service';
import { UserCreateDTO } from '../DTO/user-create-DTO';
import { IUserRepository } from '../user-interface';

// Mock do UserRepository
export const mockUserRepository = (): jest.Mocked<IUserRepository> => ({
    createUser: jest.fn(),
    getUserId: jest.fn(),
    getUserByEmail: jest.fn(),
    getUserPassword: jest.fn(),
    changePassword: jest.fn(),
    changeEmail: jest.fn(),
    softDeleteUser: jest.fn()
  });


// Mock do bcrypt
jest.mock('bcrypt', () => ({
  hashSync: jest.fn(),
  compareSync: jest.fn(),
}));

describe('UserService', () => {
  let userService: UserService;

  beforeEach(() => {
    // Cria uma nova instância do UserService com o mock do UserRepository
    userService = new UserService(mockUserRepository());
    jest.clearAllMocks(); // Limpa os mocks antes de cada teste
  });

  // Testes para createUser
  describe('createUser', () => {
    it('should create a user with hashed password', async () => {
      const userData: UserCreateDTO = {
        email: 'test@example.com',
        password: 'password123',
      };

      const hashedPassword = 'hashedPassword123';
      const userModel = new UserModel({
        id: '1',
        email: userData.email,
        password: hashedPassword,
      });

      // Mock do bcrypt.hashSync
      (bcrypt.hashSync as jest.Mock).mockReturnValue(hashedPassword);

      const mockRepo = mockUserRepository();
      // Mock do UserRepository.createUser
      mockRepo.createUser.mockResolvedValue({ user: userModel });

      const result = await userService.createUser(userData);

      expect(bcrypt.hashSync).toHaveBeenCalledWith(userData.password, 10);
      expect(mockRepo.createUser).toHaveBeenCalledWith({
        email: userData.email,
        password: hashedPassword,
      });
      expect(result.user).toEqual(userModel);
    });

    it('should throw an error if password hashing fails', async () => {
      const userData: UserCreateDTO = {
        email: 'test@example.com',
        password: 'password123',
      };

      // Mock do bcrypt.hashSync para falhar
      (bcrypt.hashSync as jest.Mock).mockImplementation(() => {
        throw new Error('Hashing failed');
      });

      await expect(userService.createUser(userData)).rejects.toThrow(
        'Encrypted password failed',
      );
    });
  });

  // Testes para getUserId
  describe('getUserId', () => {
    it('should return the user ID', async () => {
      const userId = '1';
      const mockRepo = mockUserRepository();
      mockRepo.getUserId.mockResolvedValue(userId);

      const result = await userService.getUserId(userId);

      expect(mockRepo.getUserId).toHaveBeenCalledWith(userId);
      expect(result).toBe(userId);
    });

    it('should return null if user is not found', async () => {
      const mockRepo = mockUserRepository();
      mockRepo.getUserId.mockResolvedValue(null);

      const result = await userService.getUserId('nonexistent-id');

      expect(result).toBeNull();
    });
  });

  // Testes para confirmPassword
  describe('confirmPassword', () => {
    it('should return true if passwords match', async () => {
      const userId = '1';
      const password = 'password123';
      const hashedPassword = 'hashedPassword123';
      const mockRepo = mockUserRepository();

      mockRepo.getUserPassword.mockResolvedValue(hashedPassword);
      (bcrypt.compareSync as jest.Mock).mockReturnValue(true);

      const result = await userService.confirmPassword(userId, password);

      expect(mockRepo.getUserPassword).toHaveBeenCalledWith(userId);
      expect(bcrypt.compareSync).toHaveBeenCalledWith(password, hashedPassword);
      expect(result).toBe(true);
    });

    it('should throw an error if passwords do not match', async () => {
      const userId = '1';
      const password = 'password123';
      const hashedPassword = 'hashedPassword123';

      const mockRepo = mockUserRepository();
      mockRepo.getUserPassword.mockResolvedValue(hashedPassword);
      (bcrypt.compareSync as jest.Mock).mockReturnValue(false);

      await expect(
        userService.confirmPassword(userId, password),
      ).rejects.toThrow('Encrypt password failed');
    });
  });

  // Testes para changePassword
  describe('changePassword', () => {
    it('should change the password if old password is correct', async () => {
      const data = {
        id: '1',
        oldPassword: 'oldPassword123',
        password: 'newPassword123',
      };

      const hashedPassword = 'hashedNewPassword123';

      // Mock do confirmPassword
      const mockRepo = mockUserRepository();
      jest.spyOn(userService, 'confirmPassword').mockResolvedValue(true);
      (bcrypt.hashSync as jest.Mock).mockReturnValue(hashedPassword);
      mockRepo.changePassword.mockResolvedValue(true);

      const result = await userService.changePassword(data);

      expect(userService.confirmPassword).toHaveBeenCalledWith(
        data.id,
        data.oldPassword,
      );
      expect(mockRepo.changePassword).toHaveBeenCalledWith({
        id: data.id,
        password: hashedPassword,
      });
      expect(result).toBe(true);
    });

    it('should throw an error if old password is incorrect', async () => {
      const data = {
        id: '1',
        oldPassword: 'wrongPassword',
        password: 'newPassword123',
      };

      // Mock do confirmPassword para falhar
      jest.spyOn(userService, 'confirmPassword').mockResolvedValue(false);

      await expect(userService.changePassword(data)).rejects.toThrow(
        'Password is incorrect',
      );
    });
  });

  // Testes para changeEmail
  describe('changeEmail', () => {
    it('should change the email if password is correct', async () => {
      const data = {
        id: '1',
        password: 'password123',
        email: 'new@example.com',
      };

      // Mock do confirmPassword
      jest.spyOn(userService, 'confirmPassword').mockResolvedValue(true);
      const mockRepo = mockUserRepository();
      mockRepo.changeEmail.mockResolvedValue(true);

      const result = await userService.changeEmail(data);

      expect(userService.confirmPassword).toHaveBeenCalledWith(
        data.id,
        data.password,
      );
      expect(mockRepo.changeEmail).toHaveBeenCalledWith({
        id: data.id,
        email: data.email,
      });
      expect(result).toBe(true);
    });

    it('should throw an error if password is incorrect', async () => {
      const data = {
        id: '1',
        password: 'wrongPassword',
        email: 'new@example.com',
      };

      // Mock do confirmPassword para falhar
      jest.spyOn(userService, 'confirmPassword').mockResolvedValue(false);

      await expect(userService.changeEmail(data)).rejects.toThrow(
        'Password is incorrect',
      );
    });
  });

  // Testes para softDeleteUser
  describe('softDeleteUser', () => {
    it('should soft delete the user if password is correct', async () => {
      const data = {
        id: '1',
        password: 'password123',
      };

      // Mock do confirmPassword
      jest.spyOn(userService, 'confirmPassword').mockResolvedValue(true);
      const mockRepo = mockUserRepository();
      mockRepo.softDeleteUser.mockResolvedValue(true);

      const result = await userService.softDeleteUser(data);

      expect(userService.confirmPassword).toHaveBeenCalledWith(
        data.id,
        data.password,
      );
      expect(mockRepo.softDeleteUser).toHaveBeenCalledWith({
        id: data.id,
      });
      expect(result).toBe(true);
    });

    it('should throw an error if password is incorrect', async () => {
      const data = {
        id: '1',
        password: 'wrongPassword',
      };

      // Mock do confirmPassword para falhar
      jest.spyOn(userService, 'confirmPassword').mockResolvedValue(false);

      await expect(userService.softDeleteUser(data)).rejects.toThrow(
        'Password is incorrect',
      );
    });
  });

  // Testes para hashPassword
  describe('hashPassword', () => {
    it('should hash the password', async () => {
      const password = 'password123';
      const hashedPassword = 'hashedPassword123';

      (bcrypt.hashSync as jest.Mock).mockReturnValue(hashedPassword);

      const result = await userService.hashPassword(password);

      expect(bcrypt.hashSync).toHaveBeenCalledWith(password, 10);
      expect(result).toBe(hashedPassword);
    });
  });

  // Testes para comparePassword
  describe('comparePassword', () => {
    it('should compare the password with the hash', async () => {
      const password = 'password123';
      const hash = 'hashedPassword123';

      (bcrypt.compareSync as jest.Mock).mockReturnValue(true);

      const result = await userService.comparePassword(password, hash);

      expect(bcrypt.compareSync).toHaveBeenCalledWith(password, hash);
      expect(result).toBe(true);
    });
  });
});

import bcrypt from 'bcrypt';
import { Container } from 'inversify';
import { jest , describe, beforeEach , it , expect ,  } from '@jest/globals'
import { UserModel } from '../user-model';
import { UserService } from '../user-service';
import { IUserData, IUserRepository } from '../user-interface';

// Mock do UserRepository
const mockUserRepository: jest.Mocked<IUserRepository> = {
    createUser: jest.fn(),
    getUserPassword: jest.fn(),
    getUserId: jest.fn(),
    getUserByEmail: jest.fn(),
    changePassword: jest.fn(),
    changeEmail: jest.fn(),
    softDeleteUser: jest.fn(),
};

describe('UserService', () => {
    let userService: UserService;
    let container: Container;

    beforeEach(() => {
        // Reset dos mocks
        jest.clearAllMocks();
        
        // Setup do container
        container = new Container();
        container.bind<IUserRepository>('IUserRepository').toConstantValue(mockUserRepository);
        userService = container.get<UserService>(UserService);
    });

    describe('createUser', () => {
        it('should create a user successfully', async () => {
            const defaultData: IUserData = {
                id: "123e4567-e89b-12d3-a456-426614174000",
                email: "test@example.com",
                password: "hashedPassword123",
                is_active: true,
                created_at: new Date()
              };

              const mockData: IUserData = {
                ...defaultData
              };
            

            return new UserModel(mockData);
        });

        it('should throw error if password encryption fails', async () => {
            const userData = {
                email: 'test@example.com',
                password: 'password123'
            };

            jest.spyOn(bcrypt, 'compareSync').mockReturnValue(false);

            await expect(userService.createUser(userData))
                .rejects
                .toThrow('Encrypted password failed');
        });
    });

    describe('changePassword', () => {
        it('should change password successfully', async () => {
            const changePasswordData = {
                id: '1',
                oldPassword: 'oldPassword123',
                password: 'newPassword123'
            };

            mockUserRepository.getUserPassword.mockResolvedValue('hashedOldPassword');
            mockUserRepository.changePassword.mockResolvedValue(true);
            jest.spyOn(bcrypt, 'compareSync').mockReturnValue(true);

            const result = await userService.changePassword(changePasswordData);

            expect(result).toBe(true);
            expect(mockUserRepository.changePassword).toHaveBeenCalledTimes(1);
        });

        it('should throw error if old password is incorrect', async () => {
            const changePasswordData = {
                id: '1',
                oldPassword: 'wrongPassword',
                password: 'newPassword123'
            };

            mockUserRepository.getUserPassword.mockResolvedValue('hashedOldPassword');
            jest.spyOn(bcrypt, 'compareSync').mockReturnValue(false);

            await expect(userService.changePassword(changePasswordData))
                .rejects
                .toThrow('Password is incorrect');
        });
    });

    describe('changeEmail', () => {
        it('should change email successfully', async () => {
            const changeEmailData = {
                id: '1',
                password: 'correctPassword',
                email: 'newemail@example.com'
            };

            mockUserRepository.getUserPassword.mockResolvedValue('hashedPassword');
            mockUserRepository.changeEmail.mockResolvedValue(true);
            jest.spyOn(bcrypt, 'compareSync').mockReturnValue(true);

            const result = await userService.changeEmail(changeEmailData);

            expect(result).toBe(true);
            expect(mockUserRepository.changeEmail).toHaveBeenCalledTimes(1);
        });

        it('should throw error if password is incorrect', async () => {
            const changeEmailData = {
                id: '1',
                password: 'wrongPassword',
                email: 'newemail@example.com'
            };

            mockUserRepository.getUserPassword.mockResolvedValue('hashedPassword');
            jest.spyOn(bcrypt, 'compareSync').mockReturnValue(false);

            await expect(userService.changeEmail(changeEmailData))
                .rejects
                .toThrow('Password is incorrect');
        });
    });

    describe('softDeleteUser', () => {
        it('should soft delete user successfully', async () => {
            const deleteData = {
                id: '1',
                password: 'correctPassword'
            };

            mockUserRepository.getUserPassword.mockResolvedValue('hashedPassword');
            mockUserRepository.softDeleteUser.mockResolvedValue(true);
            jest.spyOn(bcrypt, 'compareSync').mockReturnValue(true);

            const result = await userService.softDeleteUser(deleteData);

            expect(result).toBe(true);
            expect(mockUserRepository.softDeleteUser).toHaveBeenCalledTimes(1);
        });

        it('should throw error if password is incorrect for deletion', async () => {
            const deleteData = {
                id: '1',
                password: 'wrongPassword'
            };

            mockUserRepository.getUserPassword.mockResolvedValue('hashedPassword');
            jest.spyOn(bcrypt, 'compareSync').mockReturnValue(false);

            await expect(userService.softDeleteUser(deleteData))
                .rejects
                .toThrow('Password is incorrect');
        });
    });

    describe('Password utilities', () => {
        describe('hashPassword', () => {
            it('should return hashed password', async () => {
                const password = 'password123';
                const hashedPassword = await userService.hashPassword(password);
                
                expect(hashedPassword).toBeDefined();
                expect(hashedPassword).not.toBe(password);
                expect(typeof hashedPassword).toBe('string');
            });
        });

        describe('comparePassword', () => {
            it('should return true for matching passwords', async () => {
                const password = 'password123';
                const hashedPassword = await userService.hashPassword(password);
                
                const result = await userService.comparePassword(password, hashedPassword);
                
                expect(result).toBe(true);
            });

            it('should return false for non-matching passwords', async () => {
                const password = 'password123';
                const wrongPassword = 'wrongpassword';
                const hashedPassword = await userService.hashPassword(password);
                
                const result = await userService.comparePassword(wrongPassword, hashedPassword);
                
                expect(result).toBe(false);
            });
        });
    });
});
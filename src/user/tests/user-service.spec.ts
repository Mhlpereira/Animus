import "reflect-metadata";
import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { Container } from 'inversify';
import { IUserModel, IUserService } from "../../user/user-interface";
import { UserService } from "../../user/user-service";
import { UserModel } from "../../user/user-model";
import { UserCreateDTO } from "../../user/DTO/user-create-DTO";

describe("FEATURE: UserService", () => {
    let container: Container;
    let userService: IUserService;
    let userModelMock: jest.Mocked<IUserModel>;

    beforeEach(() => {
        container = new Container();

        userModelMock = {
            createUser: jest.fn<(data: { email: string; password: string }) => Promise<{ user: UserModel }>>()
                .mockResolvedValue({ user: new UserModel({ id: '1', email: 'test@example.com', password: 'hashedPassword' }) }),

            getUserById: jest.fn<(id: string) => Promise<UserModel | null>>()
                .mockResolvedValue(new UserModel({ id: '1', email: 'test@example.com', password: 'hashedPassword' })),

            getUserByEmail: jest.fn<(email: string) => Promise<UserModel | null>>()
                .mockResolvedValue(null),
        } as jest.Mocked<IUserModel>;

        container.bind<IUserModel>("IUserModel").toConstantValue(userModelMock);
        container.bind<IUserService>("IUserService").to(UserService);

        userService = container.get<IUserService>("IUserService");
    });

    it("should create a new user", async () => {
        const userDTO: UserCreateDTO = { email: 'test@example.com', password: 'password123' };

        const result = await userService.createUser(userDTO);

        expect(userModelMock.createUser).toHaveBeenCalledWith({ email: userDTO.email, password: expect.any(String) });
        expect(result.user).toBeDefined();
        expect(result.user.email).toBe(userDTO.email);
    });

    it("should fetch a user by ID", async () => {
        const userId = "1";
        const result = await userService.getUserById(userId);

        expect(userModelMock.getUserById).toHaveBeenCalledWith(userId);
        expect(result).toBeDefined();
        expect(result?.id).toBe(userId);
    });

    it("should return null if user does not exist", async () => {
        userModelMock.getUserByEmail.mockResolvedValue(null);

        const result = await userService.getUserByEmail("notfound@example.com");

        expect(userModelMock.getUserByEmail).toHaveBeenCalledWith("notfound@example.com");
        expect(result).toBeNull();
    });
});

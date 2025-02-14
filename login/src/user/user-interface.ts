import { UserModel } from "./user-model";
import { UserCreateDTO } from './DTO/user-create-DTO';

export interface IUserData{
    id?: string;
    email?: string;
    password?: string;
    created_at?: Date;
}

export interface IUserModel{
    createUser(data: {email: string, password: string }): Promise<{user: UserModel}>;
    getUserById(id: string): Promise<UserModel | null>;
    getUserByEmail(email: string): Promise<UserModel | null>;
}

export interface IUserService{
    createUser(data: UserCreateDTO): Promise<{user: UserModel }>;
    getUserById(id: string): Promise<UserModel | null>;
    getUserByEmail(email: string): Promise<UserModel | null>;
    hashPassword(password: string): Promise<string>;
    comparePassword(password: string, hash: string): Promise<boolean>;
}
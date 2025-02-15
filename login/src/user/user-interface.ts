import { UserModel } from "./user-model";
import { UserCreateDTO } from './DTO/user-create-DTO';

export interface IUserData{
    id?: string;
    email?: string;
    password?: string;
    created_at?: Date;
}

export interface IUserRepository{
    createUser(data: {email: string, password: string }): Promise<{user: UserModel}>;
    getUserById(id: string): Promise<UserModel | null>;
    getUserByEmail(email: string): Promise<UserModel | null>;
    changePassword(data: {id: string, password: string}): Promise<boolean>;
    getUserPassword(id:string): Promise<string>;
}

export interface IUserService{
    createUser(data: UserCreateDTO): Promise<{user: UserModel }>;
    confirmPassword(id: string, password: string): Promise<boolean>;
    changePassword(data: {id: string, password: string}): Promise<boolean>;
    hashPassword(password: string): Promise<string>;
    comparePassword(password: string, hash: string): Promise<boolean>;
}
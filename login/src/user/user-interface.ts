import { UserModel } from "./user-model";
import { UserCreateDTO } from './DTO/user-create-DTO';

export interface IUserData{
    id?: string;
    email?: string;
    password?: string;
    is_active?: boolean;
    created_at?: Date;
    update_at?: Date;
    password_update_at?: Date;
}

export interface IUserRepository{
    createUser(data: {email: string, password: string }): Promise<{user: UserModel}>;
    getUserById(id: string): Promise<UserModel | null>;
    getUserByEmail(email: string): Promise<UserModel | null>;
    getUserPassword(id:string): Promise<string>;
    changePassword(data: {id: string, password: string}): Promise<boolean>;
    changeEmail(data:{id: string, email:string}): Promise<boolean>;
    softDeleteUser(data:{id:string}): Promise<boolean>;
    
}

export interface IUserService{
    createUser(data: UserCreateDTO): Promise<{user: UserModel }>;
    getUserById(id: string): Promise<UserModel | null>;
    confirmPassword(id: string, password: string): Promise<boolean>;
    changePassword(data: {id: string, oldPassword: string, password:string}): Promise<boolean>;
    changeEmail(data:{id: string,password:string, email:string}): Promise<boolean>;
    softDeleteUser(data: {id: string, password: string}):Promise<boolean>
    hashPassword(password: string): Promise<string>;
    comparePassword(password: string, hash: string): Promise<boolean>;
}
import { UsersService } from './users.service';
import { Request, Response } from 'express';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getRegister(): void;
    getLogin(): void;
    getUser_profile(): void;
    getProfile(userId: string, res: Response): Promise<void>;
    addUser(userName: string, userEmail: string, userPassword: string, userConfirm: string, userNumber: string, isAdmin: boolean, res: Response): Promise<void | {
        url: string;
    }>;
    getAllUsers(): Promise<{
        id: any;
        username: string;
        email: string;
        password: string;
        number: string;
        isAdmin: boolean;
    }[]>;
    getUser(userEmail: string): Promise<{
        id: string;
        username: string;
        email: string;
        password: string;
        number: string;
        isAdmin: boolean;
    }>;
    connectuser(userEmail: string, userPassword: string, session: Record<string, any>, res: Response): Promise<void | {
        url: string;
    }>;
    cookie(request: Request, response: Response): void;
    logout(res: Response): Promise<void>;
    updateUser(userId: string, userUserName: string, userEmail: string, userPassword: string, userNUmber: string, isAdmin: boolean): Promise<{
        message: string;
        updatedUser: import("./users.model").User;
    }>;
    removeUser(userId: string): Promise<{
        message: string;
    }>;
}

import { Model } from 'mongoose';
import { User } from './users.model';
export declare class UsersService {
    private readonly userModel;
    constructor(userModel: Model<User>);
    insertUser(username: string, email: string, password: string, number: string, isAdmin: boolean): Promise<string>;
    getUsers(): Promise<{
        id: any;
        username: string;
        email: string;
        password: string;
        number: string;
        isAdmin: boolean;
    }[]>;
    getUsersNumber(): Promise<number>;
    getSingleUser(userId: string): Promise<{
        id: string;
        username: string;
        email: string;
        password: string;
        number: string;
        isAdmin: boolean;
    }>;
    findUsers(email: string): Promise<(import("mongoose").Document<unknown, {}, User> & User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    updateUser(userId: string, username: string, email: string, password: string, number: string, isAdmin: boolean): Promise<User>;
    deleteUser(userId: string): Promise<void>;
    private findUser;
}

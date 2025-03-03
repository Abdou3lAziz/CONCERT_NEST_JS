import { UsersService } from '../users/users.service';
import { ReservationService } from '../reservation/reservation.service';
import { ConcertService } from '../concert/concert.service';
import { Response } from 'express';
export declare class AdminController {
    private readonly UsersService;
    private readonly reservationService;
    private readonly ConcertService;
    constructor(UsersService: UsersService, reservationService: ReservationService, ConcertService: ConcertService);
    getRegister(): void;
    root(): Promise<{
        AllUsers: {
            id: any;
            username: string;
            email: string;
            password: string;
            number: string;
            isAdmin: boolean;
        }[];
        Numbre: number;
        Numbres: number;
        numbs: number;
    }>;
    createUsers(userName: string, userEmail: string, userPassword: string, userConfirm: string, userNumber: string, isAdmin: boolean, res: Response): Promise<void | {
        url: string;
    }>;
    findAll(): Promise<{
        id: any;
        username: string;
        email: string;
        password: string;
        number: string;
        isAdmin: boolean;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        username: string;
        email: string;
        password: string;
        number: string;
        isAdmin: boolean;
    }>;
    updateUser(id: string, userName: string, userEmail: string, userPassword: string, userNumber: string, isAdmin: boolean, res: Response): Promise<void | import("../users/users.model").User>;
    removeUser(id: string): Promise<{
        url: string;
    }>;
}
